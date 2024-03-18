import InvalidInputError from "../../utils/errors/InvalidInputError.js";
import { findUserById } from "../User/user-repository.js";
import { findPosts } from "./post-repository.js";
import isValidImageUrl from "../../utils/validators/isValidImageUrl.js";
import makeTag from "../../utils/treatment-utils/makeTag.js";

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

export const createPostService = async (req, image, caption, visibility, tags) => {
    try {
        const userId = req.tokenData.userId;
        if (!image || !isValidImageUrl(image)) {
            throw new InvalidInputError(400, "Image is required");
        }
        if (visibility && !isValidVisibility(visibility)) {
            throw new InvalidInputError(400, "Invalid visibility");
        }
        for (let i in tags) {
            if (tags[i].charAt(0) !== "#") {
                makeTag(tags[i]);
            }
            if (!isValidTag(tags[i])) {
                throw new InvalidInputError(400, "Invalid tag"); //TODO add detail tag to error
            }
        }
        if (caption && !isValidCaption(caption)) {
            throw new InvalidInputError(400, "Invalid caption");
        }
        
        const post = await createPost(userId, image, caption, visibility, tags);       
    } catch (error) {
        throw error;
    }
}