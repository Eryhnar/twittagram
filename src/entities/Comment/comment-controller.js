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

// export const getComments = async (req, res) => {
//     try {
//         res.status(200).json(
//             { 
//                 success: true,
//                 message: "Comments retrieved successfully",
//             }
//         );
//     } catch (error) {
//         res.status(500).json(
//             { 
//                 success: false,
//                 message: "Comments could not be retrieved",
//                 error: error.message 
//             }
//         );        
//     }
// }

export const deleteComment = async (req, res) => {
    try {
        const userId = req.tokenData.userId;
        const { commentId, postId } = req.body;
        if ( !commentId || !postId ) {
            return res.status(400).json(
                { 
                    success: false,
                    message: "All fields are required" 
                }
            );
        }
        
        // const post = await Post.findOne(
        //     { 
        //         _id: postId,
        //     }
        // );
        // if ( !post ) {
        //     return res.status(400).json(
        //         { 
        //             success: false,
        //             message: "Post does not exist" 
        //         }
        //     );
        // }
        const comment = await Comment.findOne(
            { 
                _id: commentId,
                post: postId,
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
        if ( comment.author != userId ) {
            return res.status(401).json(
                { 
                    success: false,
                    message: "Unauthorized" 
                }
            );
        }
        await Comment.findOneAndUpdate(
            { 
                _id: commentId 
            },
            { 
                $set: { 
                    content: "This comment has been deleted" 
                } 
            }
        );
        
        res.status(200).json(
            { 
                success: true,
                message: "Comment deleted successfully",
            }
        );
    } catch (error) {
        res.status(500).json(
            { 
                success: false,
                message: "Comment could not be deleted",
                error: error.message 
            }
        );
    }
}

export const deleteReply = async (req, res) => {
    try {
        const userId = req.tokenData.userId;
        const { replyId, postId, commentId } = req.body;
        if ( !replyId || !postId || !commentId ) {
            return res.status(400).json(
                { 
                    success: false,
                    message: "All fields are required" 
                }
            );
        }
        const comment = await Comment.findOne(
            { 
                _id: commentId, 
                post: postId 
            }
        )
        .populate('replies');
        if (!comment) {
            return res.status(400).json(
                { 
                    success: false, 
                    message: "Comment does not exist" 
                }
            );
        }
        const reply = comment.replies.find(
            (reply) => reply._id == replyId
        );
        // const reply = await Comment.findOne(
        //     { 
        //         _id: replyId,
        //         post: postId,
        //     }
        // );
        // if ( !reply ) {
        //     return res.status(400).json(
        //         { 
        //             success: false,
        //             message: "Reply does not exist" 
        //         }
        //     );
        // }
        if ( reply.author != userId ) {
            return res.status(401).json(
                { 
                    success: false,
                    message: "Unauthorized" 
                }
            );
        }
        await Comment.findOneAndUpdate(
            { 
                _id: replyId 
            },
            { 
                $set: { 
                    content: "This reply has been deleted" 
                } 
            }
        );
        // comment.replies = comment.replies.pull(replyId);
        // await comment.save();
        res.status(200).json(
            { 
                success: true,
                message: "Reply deleted successfully",
            }
        );
    } catch (error) {
        res.status(500).json(
            { 
                success: false,
                message: "Reply could not be deleted",
                error: error.message 
            }
        );
    }
}

export const likeComment = async (req, res) => {
    try {
        res.status(200).json(
            { 
                success: true,
                message: "Comment liked successfully",
            }
        );
    } catch (error) {
        res.status(500).json(
            { 
                success: false,
                message: "Comment could not be liked",
                error: error.message 
            }
        );
    }
}