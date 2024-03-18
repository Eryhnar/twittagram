import InvalidInputError from "../../utils/errors/InvalidInputError.js";
import { findUserById } from "../User/user-repository.js";
import { findPosts } from "./post-repository.js";

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