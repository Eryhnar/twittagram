import Post from "../Post/post-model.js";
import User from "../User/user-model.js";
import Comment from "./comment-model.js";
import { deleteCommentService, likeCommentService, postCommentService, postReplyService, updateCommentService } from "./comment-service.js";

export const postComment = async (req, res) => {
    try {
        
        const comment = await postCommentService(req);
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
        
        const reply = await postReplyService(req);

        res.status(200).json(
            { 
                success: true,
                message: "Reply posted successfully",
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

export const deleteComment = async (req, res) => {
    try {
        
        deleteCommentService(req);
        
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

// export const deleteReply = async (req, res) => {
//     try {
//         const userId = req.tokenData.userId;
//         const { replyId, postId, commentId } = req.body;
//         if ( !replyId || !postId || !commentId ) {
//             return res.status(400).json(
//                 { 
//                     success: false,
//                     message: "All fields are required" 
//                 }
//             );
//         }
//         const comment = await Comment.findOne(
//             { 
//                 _id: commentId, 
//                 post: postId 
//             }
//         )
//         .populate("replies");
//         if (!comment) {
//             return res.status(400).json(
//                 { 
//                     success: false, 
//                     message: "Comment does not exist" 
//                 }
//             );
//         }
//         const reply = comment.replies.find(
//             (reply) => reply._id == replyId
//         );
//         // const reply = await Comment.findOne(
//         //     { 
//         //         _id: replyId,
//         //         post: postId,
//         //     }
//         // );
//         // if ( !reply ) {
//         //     return res.status(400).json(
//         //         { 
//         //             success: false,
//         //             message: "Reply does not exist" 
//         //         }
//         //     );
//         // }
//         if ( reply.author != userId ) {
//             return res.status(401).json(
//                 { 
//                     success: false,
//                     message: "Unauthorized" 
//                 }
//             );
//         }
//         await Comment.findOneAndUpdate(
//             { 
//                 _id: replyId 
//             },
//             { 
//                 $set: { 
//                     content: "This reply has been deleted" 
//                 } 
//             }
//         );
//         // comment.replies = comment.replies.pull(replyId);
//         // await comment.save();
//         res.status(200).json(
//             { 
//                 success: true,
//                 message: "Reply deleted successfully",
//             }
//         );
//     } catch (error) {
//         res.status(500).json(
//             { 
//                 success: false,
//                 message: "Reply could not be deleted",
//                 error: error.message 
//             }
//         );
//     }
// }

export const likeComment = async (req, res) => {
    try {
        
        const comment = await likeCommentService(req);

        res.status(200).json(
            { 
                success: true,
                message: "Comment liked successfully",
                data: comment
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

// export const likeReply = async (req, res) => {
//     try {
//         const userId = req.tokenData.userId;
//         const { replyId, postId, commentId } = req.body;
//         if ( !replyId || !postId || !commentId ) {
//             return res.status(400).json(
//                 { 
//                     success: false,
//                     message: "All fields are required" 
//                 }
//             );
//         }

//         const comment = await Comment.findOne(
//             { 
//                 _id: commentId, 
//                 post: postId,
//                 replies: { $in: [replyId] }
//             }
//         )
//         if ( !comment ) {
//             return res.status(400).json(
//                 { 
//                     success: false,
//                     message: "Comment does not exist" 
//                 }
//             );
//         }

//         const reply = await Comment.findOne(
//             { 
//                 _id: replyId,
//                 post: postId,
//             }
//         );
//         if ( !reply ) {
//             return res.status(400).json(
//                 { 
//                     success: false,
//                     message: "Reply does not exist" 
//                 }
//             );
//         }

//         if ( reply.likes.includes(userId) ) {
//             reply.likes.pull(userId);
//         }
//         else {
//             reply.likes.push(userId);
//         }
//         await reply.save();

//         res.status(200).json(
//             { 
//                 success: true,
//                 message: "Reply liked successfully",
//                 data: comment,
//                 details: reply
//             }
//         );
//     } catch (error) {
//         res.status(500).json(
//             { 
//                 success: false,
//                 message: "Reply could not be liked",
//                 error: error.message 
//             }
//         );
//     }
// }

export const updateComment = async (req, res) => {
    try {
        
        const comment = await updateCommentService(req);
        res.status(200).json(
            { 
                success: true,
                message: "Comment updated successfully",
                data: comment
            }
        );
    } catch (error) {
        res.status(500).json(
            { 
                success: false,
                message: "Comment could not be updated",
                error: error.message 
            }
        );
    }
}

// export const updateReply = async (req, res) => {
//     try {
//         const userId = req.tokenData.userId;
//         const { replyId, postId, commentId, content } = req.body;
//         if ( !replyId || !postId || !commentId || !content ) {
//             return res.status(400).json(
//                 { 
//                     success: false,
//                     message: "All fields are required" 
//                 }
//             );
//         }
//         const comment = await Comment.findOne(
//             { 
//                 _id: commentId, 
//                 post: postId,
//                 replies: { $in: [replyId] }
//             }
//         );
//         if ( !comment ) {
//             return res.status(400).json(
//                 { 
//                     success: false,
//                     message: "Comment does not exist" 
//                 }
//             );
//         }
//         const reply = await Comment.findOne(
//             { 
//                 _id: replyId,
//                 post: postId,
//                 author: userId,
//             }
//         );
//         if ( !reply ) {
//             return res.status(400).json(
//                 { 
//                     success: false,
//                     message: "Reply does not exist" 
//                 }
//             );
//         }
//         reply.content = content;
//         await reply.save();
//         res.status(200).json(
//             { 
//                 success: true,
//                 message: "Reply updated successfully",
//                 data: comment,
//                 details: reply
//             }
//         );
//     } catch (error) {
//         res.status(500).json(
//             { 
//                 success: false,
//                 message: "Reply could not be updated",
//                 error: error.message 
//             }
//         );
//     }
// }