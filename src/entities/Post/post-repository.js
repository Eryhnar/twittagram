import Post from "./post-model.js";
import UndefinedError from "../../utils/errors/UndefinedError.js";

// export const findPosts = async (searchFilters, skip, limit, userId) => {
//     try {
//         const posts =  await Post.find(
//             searchFilters,
//         ).skip(skip)
//         .limit(limit);
//         return posts;
//     } catch (error) {
//         throw new UndefinedError("Error finding posts");
//     }
// }

export const findPosts = async (searchFilters, skip, limit, userId, sort) => {
    try {
        // Add additional conditions to searchFilters
        // searchFilters.$or = [
        //     { visibility: 'public' },
        // ];

        const posts = await Post.find(searchFilters)
            .sort(sort)
            .skip(skip)
            .limit(limit);
        return posts;
    } catch (error) {
        throw new UndefinedError("Error finding posts");
    }
}

export const createPost = async (userId, caption, visibility, tags) => {
    try {
        Post.create({ author: userId, caption, visibility, tags });
    } catch (error) {
        throw new UndefinedError("Error creating post");
    }
}