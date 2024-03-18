import InvalidInputError from "../../utils/errors/InvalidInputError.js";
import { findUserById } from "../User/user-repository.js";
import { createPost, findPost, findPosts, updatePost } from "./post-repository.js";
import isValidImageUrl from "../../utils/validators/isValidImageUrl.js";
import processTag from "../../utils/treatment-utils/processTag.js";
import isValidVisibility from "../../utils/validators/isValidVisibility.js";
import isValidHashtag from "../../utils/validators/isValidHashtag.js";
import isValidCaption from "../../utils/validators/isValidCaption.js";

export const getTimelineService = async (req, limit, skip, page) => {
    try {
        if (isNaN(page) || page <= 0) {
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
        const post = await findPost(userId, postId);
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
    