import InvalidInputError from "../../utils/errors/InvalidInputError.js";
import { findUserById, updateProfile } from "../User/user-repository.js";
import { createPost, deletePostById, findPost, findPosts, updatePost } from "./post-repository.js";
import isValidImageUrl from "../../utils/validators/isValidImageUrl.js";
import processTag from "../../utils/treatment-utils/processTag.js";
import isValidVisibility from "../../utils/validators/isValidVisibility.js";
import isValidHashtag from "../../utils/validators/isValidHashtag.js";
import isValidCaption from "../../utils/validators/isValidCaption.js";
import NotFoundError from "../../utils/errors/NotFoundError.js";

export const getTimelineService = async (req, limit, skip, page) => {
    try {
        if (isNaN(page) || page <= 0) { //TODO use a validator
            throw new InvalidInputError(400, "Invalid page number");
        }
        const userId = req.tokenData.userId;
        const user = await findUserById(userId);
        const following = user.following;
        const sort = { createdAt: -1 };

        const posts = await findPosts(
            {
                author: { $in: following },
            },
            {
                sort,
                skip,
                limit
            }
        );
        return posts;
    } catch (error) {
        throw error;
    }
}

export const getPostsService = async (req, limit, skip, page) => {
    try {
        if (isNaN(page) || page <= 0) {
            throw new InvalidInputError(400, "Invalid page number");
        }
        // const searchFilters = { visibility: "friends", visibility: "private"};
        const sort = { createdAt: -1 }; //todo take sort from req.query
        const posts = await findPosts({}, skip, limit, sort);
        return posts;
    } catch (error) {
        throw error;
    }
}

export const createPostService = async (req) => {
    try {
        const { image, caption, visibility, tags } = req.body;
        const userId = req.tokenData.userId;
        if (!image || !isValidImageUrl(image)) {
            throw new InvalidInputError(400, "Image is required");
        }
        if (visibility && !isValidVisibility(visibility)) {
            throw new InvalidInputError(400, "Invalid visibility");
        }
        if (tags) {
            if (Array.isArray(tags)) {
                for (let tag of tags) {
                    const processedTag = processTag(tag);
                    if (!isValidHashtag(processedTag)) {
                        throw new InvalidInputError(400, "Invalid tag");
                    }
                }
            } else {
                const processedTag = processTag(tags);
                if (!isValidHashtag(processedTag)) {
                    throw new InvalidInputError(400, "Invalid tag");
                }
            }
        }
        if (caption && !isValidCaption(caption)) {
            throw new InvalidInputError(400, "Invalid caption");
        }
        return await createPost(userId, image, caption, visibility, tags);       
    } catch (error) {
        throw error;
    }
}

export const updatePostService = async (req) => {
    try {
        const { postId, caption, visibility, tags } = req.body;
        const userId = req.tokenData.userId;
        const updateFields = {};
        const post = await findPost({ author: userId, _id: postId});
        if (!post) {
            throw new InvalidInputError(400, "Post not found");
        }
        if (caption) {
            if (!isValidCaption(caption)) {
                throw new InvalidInputError(400, "Invalid caption");
            }
            updateFields.caption = caption;
        }
        if (visibility) {
            if (!isValidVisibility(visibility)) {
                throw new InvalidInputError(400, "Invalid visibility");
            }
            updateFields.visibility = visibility;
        }
        let processedTags = [];
        if (tags) {
            if (Array.isArray(tags)) {
                for (let tag of tags) {
                    const processedTag = processTag(tag);
                    if (!isValidHashtag(processedTag)) {
                        throw new InvalidInputError(400, "Invalid tag");
                    }
                    processedTags.push(processedTag);
                }
            } else {
                const processedTag = processTag(tags);
                if (!isValidHashtag(processedTag)) {
                    throw new InvalidInputError(400, "Invalid tag");
                }
                processedTags.push(processedTag);
            }
            updateFields.tags = processedTags;
        }
        return await updatePost(post, updateFields);
    } catch (error) {
        throw error;
    }
}

export const getOwnPostsService = async (req, limit, skip, page) => {
    try {
        const userId = req.tokenData.userId;
        const sort = { createdAt: -1 };
        //TODO validate page HERE or in controller
        const posts = await findPosts(
            {
                author: userId
            },
            sort,
            skip,
            limit,
        )    
        return posts;
    } catch (error) {
        throw error;
    }
}

export const getPostByIdService = async (req) => {
    try {
        console.log("1");
        const postId = req.params.id;
        const post = await findPost({ _id: postId, visibility: "public" });
        if (!post) {
            throw new NotFoundError(404, "Post not found");
        }
        return post;
    } catch (error) {
        throw error;
    }
}
    
export const deletePostByIdService = async (req) => {
    try {
        const postId = req.params.id;
        const userId = req.tokenData.userId;
        const post = await findPost({ _id: postId, author: userId });
        if (!post) {
            throw new NotFoundError(404, "Post not found");
        }
        return await deletePostById({ _id: postId });
    } catch (error) {
        throw error;
    }
}

export const toggleLikeService = async (req) => {
    try {
        //const postId = req.params.id;
        const postId = req.body.postId;
        const userId = req.tokenData.userId;
        const post = await findPost({ _id: postId, visibility: "public"});
        if (!post) {
            throw new NotFoundError(404, "Post not found");
        }
        post.likes.includes(userId) ? post.likes.pull(userId) : post.likes.push(userId);
        return await updatePost(post, { likes: post.likes });
    } catch (error) {
        throw error;
    }
}

export const savePostService = async (req) => {
    try {
        const userId = req.tokenData.userId;
        const postId = req.body.postId;
        const user = await findUserById(userId);
        const post = await findPost({ _id: postId });
        if (!post) {
            throw new NotFoundError(404, "Post not found");
        }
        user.saved.includes(postId) 
        ? user.saved.pull(postId) 
        : user.saved.push(postId);
        const updatedProfile = await updateProfile(user, { saved: user.saved });
        return updatedProfile;
    } catch (error) {
        throw error;
    }
}