import User from "../User/user-model.js";
import Post from "./post-model.js";

// extract public posts from non-following users into for you page
export const getTimeline = async (req, res) => {
    try {
        //const limit = parseInt(req.query.limit) || 10;
        const page = req.query.page || 1;
        const limit = 10;
        const skip = (page - 1) * limit;
        if (isNaN(page) || page <= 0) {
            return res.status(400).json(
                { 
                    success: false,
                    message: "Invalid page number"
                }
            );
        }
        const userId = req.tokenData.userId;
        const user = await User.findOne({ _id: userId });// replace with req.tokenUser

        const following = user.following;

        const posts = await Post.find(
            { 
                author: { $nin: user._id },
                visibility: 'public'
            }
        ).sort(
            { 
                createdAt: -1
            }
        ).skip(skip).limit(limit);

        const followerPosts = await Post.find(
            { 
                author: { $in: following },
                visibility: 'followers'
            }
        ).sort(
            { 
                createdAt: -1
            }
        ).skip(skip).limit(limit);

        // Combine the two arrays of posts
        const allPosts = [...posts, ...followerPosts];

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

        if (isNaN(page) || page <= 0) {
            return res.status(400).json(
                { 
                    success: false,
                    message: "Invalid page number"
                }
            );
        }

        const posts = await Post.find()
            .sort(
                { 
                    createdAt: -1
                }
            ).skip(skip).limit(limit);

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
        const { caption, image, visibility, tags } = req.body;
        const userId = req.tokenData.userId; // replace with req.tokenUser
        const user = await User.findOne({ _id: userId });

        if (!image) {
            return res.status(400).json(
                { 
                    success: false,
                    message: "Image is required"
                }
            );
        }

        const post = await Post.create(
            {
                author: user._id,
                caption,
                image,
                visibility,
                tags,
            }
        );

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
        res.status(200).json(
            { 
                success: true,
                message: "Post updated successfully",
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
        const userId = req.tokenData.userId; 
        const posts = await Post.find(
            {
                author: userId
            }
        ).sort(
            { 
                createdAt: -1
            }
        ).skip(skip).limit(limit);

        res.status(200).json(
            { 
                success: true,
                message: "Get all own posts",
                data: posts
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