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
        throw error;
    }
}

export const createPost = async (userId, image, caption, visibility, tags) => {
    try {
        const post = await Post.create(
            { 
                author: userId, 
                image,
                caption, 
                visibility, 
                tags 
            }
        );
        return post;
    } catch (error) {
        throw error
        //throw new UndefinedError("Error creating post", error);
    }
}

export const findPost = async (userId, id) => {
    try {
        const post = await Post.findOne(
            {
                _id: id,
                author: userId
            }
        );
        return post;
    } catch (error) {
        throw error;
    }
}

export const updatePost = async (post, updateFields) => {
    try {
        const updatedPost = await Post.findOneAndUpdate(
            {
                _id: post._id
            },
            updateFields,
            {
                new: true
            }
        )
        return updatedPost;
    } catch (error) {
        throw error;
    }
}