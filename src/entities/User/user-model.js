import { Schema, model } from "mongoose"

const UserSchema = new Schema(
    {
        userHandle: {
            type: String,
            required: true,
            unique: true,
        },
        userName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            select: false,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        role: {
            type: String,
            enum: ["user", "admin", "super_admin"],
            default: "user",
            select: false,
        },
        profilePicture: {
            type: String,
            required: true,
            default: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg",
        },
        bio: {
            type: String,
            required: false,
        },
        isActive: {
            type: Boolean,
            required: true,
            default: true,
        },
        followers: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
        following: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
        // friends: [{
        //     type: Schema.Types.ObjectId,
        //     ref: "User"
        // }],
        // posts: [{ //maybe later
        //     type: Schema.Types.ObjectId,
        //     ref: "Post"
        // }],
        // liked: [{ //maybe later
        //     type: Schema.Types.ObjectId,
        //     ref: "Post"
        // }],
        saved: [{
            type: Schema.Types.ObjectId,
            ref: "Post"
        }],
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

const User = model("User", UserSchema)

export default User