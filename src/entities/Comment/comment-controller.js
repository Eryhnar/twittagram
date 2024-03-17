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

export const postReply = async (req, res) => {
    try {
        const authorId = req.tokenData.userId;
        const { postId, content, commentId } = req.body;
        if ( !postId || !content || !commentId) {
            return res.status(400).json(
                { 
                    success: false,
                    message: "All fields are required" 
                }
            );
        }

        // validate content.trim().length > 0

        const post = await Post.findOne(
            { 
                _id: postId,
            }
        );

        if ( !post ) {
            return res.status(400).json(
                { 
                    success: false,
                    message: "Post does not exist" 
                }
            );
        }
        const comment = await Comment.findOne(
            { 
                _id: commentId 
            }
        );
        if ( !comment ) {
            return res.status(400).json(
                { 
                    success: false,
                    message: "Comment does not exist" 
                }
            );
        }

        const reply = await Comment.create(
            {
                author: authorId,
                post: postId,
                content,
            }
        );

        comment.replies.push(reply._id);
        await comment.save();
        // const comment = await Comment.updateOne(
        //     { 
        //         _id: commentId 
        //     },
        //     { 
        //         $push: { replies: reply._id } 
        //     }
        // );

        res.status(200).json(
            { 
                success: true,
                message: "Reply posted successfully",
                data: comment,
                details: reply
            }
        );
    } catch (error) {
        res.status(500).json(
            { 
                success: false,
                message: "Reply could not be posted",
                error: error.message 
            }
        );
    }
}

export const getComments = async (req, res) => {
    try {
        res.status(200).json(
            { 
                success: true,
                message: "Comments retrieved successfully",
            }
        );
    } catch (error) {
        res.status(500).json(
            { 
                success: false,
                message: "Comments could not be retrieved",
                error: error.message 
            }
        );        
    }
}