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
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["user", "admin", "super_admin"],
            default: "user",
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
            ref: 'User'
        }],
        following: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        // favouriteBooks: [
        //   {
        //     type: Schema.Types.ObjectId,
        //     ref: 'Book'
        //   }
        // ]
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

const User = model("User", UserSchema)

export default User