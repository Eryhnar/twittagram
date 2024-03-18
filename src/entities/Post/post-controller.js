import User from "../User/user-model.js";
import Post from "./post-model.js";
import { createPostService, getOwnPostsService, getPostByIdService, getPostsService, getTimelineService, updatePostService } from "./post-service.js";

// extract public posts from non-following users into for you page
export const getTimeline = async (req, res) => {
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
        res.status(500).json(
            { 
                success: false,
                message: "The timeline could not be retrieved",
                error: error.message
            }
        );
    }
}

export const getPosts = async (req, res) => {
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
        res.status(500).json(
            { 
                success: false,
                message: "The posts could not be retrieved",
                error: error.message
            }
        );
    }
}

export const createPost = async (req, res) => {
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
        res.status(500).json(
            { 
                success: false,
                message: "The post could not be created",
                error: error.message
            }
        );
    }
}

export const updatePost = async (req, res) => {
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
        res.status(500).json(
            { 
                success: false,
                message: "The post could not be updated",
                error: error.message
            }
        );
    }
}

export const getOwnPosts = async (req, res) => {
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
        res.status(500).json(
            { 
                success: false,
                message: "Your posts could not be retrieved",
                error: error.message
            }
        );
    }
}

export const getPostById = async (req, res) => {
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
        res.status(500).json(
            { 
                success: false,
                message: "The post could not be retrieved",
                error: error.message
            }
        );
    }
}

export const deletePostById = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.tokenData.userId;
        const post = await Post.findOne(
            { 
                _id: postId,
                author: userId
            }
        );
        if (!post) {
            return res.status(404).json(
                { 
                    success: false,
                    message: "Post not found"
                }
            );
        }

        await Post.deleteOne({ _id: postId });

        res.status(200).json(
            { 
                success: true,
                message: "Post deleted successfully",
            }
        );
    } catch (error) {
        res.status(500).json(
            { 
                success: false,
                message: "The post could not be deleted",
                error: error.message
            }
        );
    }
}

export const toggleLike = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.tokenData.userId;
        const post = await Post.findOne(
            { 
                _id: postId
            }
        );
        if (!post) {
            return res.status(404).json(
                { 
                    success: false,
                    message: "Post not found"
                }
            );
        }
        post.likes.includes(userId) ? post.likes.pull(userId) : post.likes.push(userId);
        await post.save();

        //todo: change this message
        res.status(200).json(
            { 
                success: true,
                message: "Post liked successfully",
                data: post
            }
        );
    } catch (error) {
        res.status(500).json(
            { 
                success: false,
                message: "The post could not be liked",
                error: error.message
            }
        );
    }
}

export const savePost = async (req, res) => {
    try {
        const userId = req.tokenData.userId;
        const user = await User.findOne({ _id: userId });
        const postId = req.params.id;
        const post = await Post.findOne(
            { 
                _id: postId
            }
        );
        if (!post) {
            return res.status(404).json(
                { 
                    success: false,
                    message: "Post not found"
                }
            );
        }
        user.saved.includes(postId) 
        ? user.saved.pull(postId) 
        : user.saved.push(postId);
        await user.save();
        
        res.status(200).json(
            { 
                success: true,
                message: "Post saved successfully",
            }
        );
    } catch (error) {
        res.status(500).json(
            { 
                success: false,
                message: "The post could not be saved",
                error: error.message
            }
        );
    }
}