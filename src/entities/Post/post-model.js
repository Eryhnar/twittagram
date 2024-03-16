import { Schema, model } from "mongoose";

const PostSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        caption: {
            type: String,
            required: false,
        },
        image: {
            type: String,
            required: true,
        },
        likes: [{
            type: Schema.Types.ObjectId,
            ref: "User",
        }],
        comments: [{
            type: Schema.Types.ObjectId,
            ref: "Comment",
        }],
        // saved: [{ //maybe later
        //     type: Schema.Types.ObjectId,
        //     ref: "User",
        // }],
        visibility: {
            type: String,
            enum: ["public", "friends", "private"],
            default: "public",
        },
        tags: [{
            type: String,
            required: false,
        }],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Post = model("Post", PostSchema);

export default Post;