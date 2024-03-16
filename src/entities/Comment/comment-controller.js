import Post from "../Post/post-model.js";
import User from "../User/user-model.js";
import Comment from "./comment-model.js";

export const postComment = async (req, res) => {
    try {
        const authorId = req.tokenData.userId;
        const author = await User.findOne({ _id: authorId });
        const { postId, content } = req.body;
        if ( !author ) {
            return res.status(400).json(
                { 
                    success: false,
                    message: "User does not exist" 
                }
            );
        }
        const post = await Post.findOne({ _id: postId })
        if ( !post ) {
            return res.status(400).json(
                { 
                    success: false,
                    message: "Post does not exist" 
                }
            );
        }
        if ( !content ) {
            return res.status(400).json(
                { 
                    success: false,
                    message: "All fields are required" 
                }
            );
        }

        const comment = await Comment.create(
            { 
                author: author._id, 
                post: postId, 
                content 
            }
        );
        res.status(201).json(
            { 
                success: true,
                message: "Comment posted successfully",
                data: comment 
            }
        );
    } catch (error) {
        res.status(500).json(
            { 
                success: false,
                message: "Commment could not be posted",
                error: error.message 
            }
        );
    }
}