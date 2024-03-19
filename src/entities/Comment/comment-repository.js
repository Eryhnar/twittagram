import Comment from "./comment-model.js";

export const postComment = async (authorId, postId, content) => {
    try {
        const comment = await Comment.create(
            {
                author: authorId,
                post: postId,
                content
            }
        );
        return comment;
    } catch (error) {
        throw error;
    }
}

export const updateComment = async (commentId, updateFields) => {
    try {
        const updatedComment = await Comment.findOneAndUpdate(
            {
                _id: commentId
            },
            updateFields,
            {
                new: true
            }
        );
        return updatedComment;
    } catch (error) {
        throw error;
    }
}

export const findComment = async (searchFilters) => {
    try {
        const comment = await Comment.findOne(
            searchFilters
        );
        return comment;
    } catch (error) {
        throw error;
    }
}