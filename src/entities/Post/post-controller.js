import User from "../User/user-model.js";
import Post from "./post-model.js";
import { createPostService, deletePostByIdService, getOwnPostsService, getPostByIdService, getPostsService, getTimelineService, savePostService, toggleLikeService, updatePostService } from "./post-service.js";

// extract public posts from non-following users into for you page
export const getTimeline = async (req, res, next) => {
    try {
        //const limit = parseInt(req.query.limit) || 10;
        const page = req.query.page || 1;
        const limit = 10;
        const skip = (page - 1) * limit;
        
        const allPosts = await getTimelineService(req, limit, skip, page);

        res.status(200).json(
            { 
                success: true,
                message: "Get all posts",
                data: allPosts,
                prev_page: page > 1 ? page - 1 : null,
                next_page: page < Math.ceil(allPosts.length / limit) ? page + 1 : null,
                page: page

            }
        );
    } catch (error) {
        next(error);
    }
}

export const getPosts = async (req, res, next) => {
    try {
        const limit = 10
        const page = req.query.page || 1;
        const skip = (page - 1) * limit;

        const posts = await getPostsService(req, limit, skip, page);

        res.status(200).json(
            { 
                success: true,
                message: "Get all posts",
                data: posts,
                prev_page: page > 1 ? page - 1 : null,
                next_page: page < Math.ceil(posts.length / limit) ? page + 1 : null,
                page: page
            }
        );
    } catch (error) {
        next(error);
    }
}

export const createPost = async (req, res, next) => {
    try {
        const post  = await createPostService(req);

        res.status(201).json(
            { 
                success: true,
                message: "Post created successfully",
                data: post
            }
        );
    } catch (error) {
        next(error);
    }
}

export const updatePost = async (req, res, next) => {
    try {
        const post = await updatePostService(req);

        res.status(200).json(
            { 
                success: true,
                message: "Post updated successfully",
                data: post
            }
        );
    } catch (error) {
        next(error);
    }
}

export const getOwnPosts = async (req, res, next) => {
    try {
        const limit = 10
        const page = req.query.page || 1;
        const skip = (page - 1) * limit;

        const posts = await getOwnPostsService(req, limit, skip, page);
        
        res.status(200).json(
            { 
                success: true,
                message: "Get all own posts",
                data: posts,
                prev_page: page > 1 ? page - 1 : null,
                next_page: page < Math.ceil(posts.length / limit) ? page + 1 : null,
                page: page
            }
        );
    } catch (error) {
        next(error);
    }
}

export const getPostById = async (req, res, next) => {
    try {
        
        const post = await getPostByIdService(req);
        res.status(200).json(
            { 
                success: true,
                message: "Post retrieved successfully",
                data: post
            }
        );
    } catch (error) {
        next(error);
    }
}

export const deletePostById = async (req, res, next) => {
    try {
        
        await deletePostByIdService(req);

        res.status(200).json(
            { 
                success: true,
                message: "Post deleted successfully",
            }
        );
    } catch (error) {
        next(error);
    }
}

export const toggleLike = async (req, res, next) => {
    try {

        const post = await toggleLikeService(req);

        //todo: change this message
        res.status(200).json(
            { 
                success: true,
                message: "Post liked successfully",
                data: post
            }
        );
    } catch (error) {
        next(error);
    }
}

export const savePost = async (req, res, next) => { //TODO move to user controller ??
    try {
        
        const updatedProfile = await savePostService(req);
        
        res.status(200).json(
            { 
                success: true,
                message: "Post saved successfully",
                data: updatedProfile
            }
        );
    } catch (error) {
        next(error);
    }
}