import InvalidInputError from "../../utils/errors/InvalidInputError.js";
import validateRequiredFields from "../../utils/validators/validateRequiredFields.js";
import { findPost } from "../Post/post-repository.js";
import { findComment, postComment, updateComment } from "./comment-repository.js";

export const postCommentService = async (req) => {
    try {
        const authorId = req.tokenData.userId;
        const { postId, content } = req.body;
        validateRequiredFields(['postId', 'content'], req.body);
        const post = await findPost({ _id: postId });
        if (!post) {
            throw new InvalidInputError(400, "Post not found");
        }
        return await postComment(authorId, postId, content);

    } catch (error) {
        throw error;
    }
}

export const postReplyService = async (req) => {
    try {
        const authorId = req.tokenData.userId;
        const { postId, commentId, content } = req.body;
        validateRequiredFields(['postId', 'commentId', 'content'], req.body);
        const post = await findPost({ _id: postId });
        if (!post) {
            throw new InvalidInputError(400, "Post not found");
        }
        const comment = await findComment({ _id: commentId });
        if (!comment) {
            throw new InvalidInputError(400, "Comment not found");
        }
        const reply = await postComment(authorId, postId, content);
        comment.replies.push(reply._id);
        const updatedComment = await updateComment(commentId, { replies: comment.replies });
        return updatedComment;
    } catch (error) {
        throw error;
    }
}