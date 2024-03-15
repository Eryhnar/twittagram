import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        likes: [{
            type: Schema.Types.ObjectId,
            ref: "User",
        }],
        replies: [{
            type: Schema.Types.ObjectId,
            ref: "Comment",
        }],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Comment = model("Comment", CommentSchema);

export default Comment;