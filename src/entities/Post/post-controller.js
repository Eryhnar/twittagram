import User from "../User/user-model.js";
import Post from "./post-model.js";

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
                page: page
            }
        );
    } catch (error) {
        res.status(500).json(
            { 
                success: false,
                message: "Internal server error",
                error: error.message
            }
        );
    }
}