import Post from "../Post/post-model.js";
import User from "./user-model.js";
import bcrypt from "bcrypt";
import { getUsersService, updateProfileService, updatePasswordService } from "./user-service.js";

export const getUsers = async (req, res) => {
    try {
        const users = await getUsersService(req.query)
        
        res.status(200).json(
            {
                success: true,
                message: "Users retrived",
                data: users
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Users could not be retrived",
                error: error
            }
        )
    }
}

export const getProfile = async (req, res) => {
    try {

        const user = req.body.tokenUser

        res.status(200).json(
            {
                success: true,
                message: "Profile retrived",
                data: user
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Profile could not be retrived",
                error: error
            }
        )
    }
}

export const updateProfile = async (req, res) => {
    try {
        
        const newProfile = await updateProfileService(req)

        res.status(200).json(
            {
                success: true,
                message: "Profile updated",
                data: newProfile
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Profile could not be updated",
                error: error.message
            }
        )
    }
}

export const updateProfilePassword = async (req, res) => {
    try {
        const updatedUser = await updatePasswordService(req);

        res.status(200).json(
            {
                success: true,
                message: "Profile updated",
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Profile could not be updated",
                error: error
            }
        )
    }
}

export const updateUserById = async (req, res) => {
    try {
        const targetUserId = req.params.id;
        const { userName, userHandle, email, role, isActive, bio, profilePicture } = req.body;

        const user = await User.findOne({ _id: targetUserId });

        if (!user) {
            return res.status(404).json(
                { 
                    message: "User not found" 
                }
            );
        }

        if (userName) {
            user.userName = userName;
        }
        if (userHandle) {
            user.userHandle = userHandle;
        }
        if (email) {
            user.email = email;
        }
        if (role) {
            user.role = role;
        }
        if (isActive) {
            user.isActive = isActive;
        }
        if (bio) {
            user.bio = bio;
        }
        if (profilePicture) {
            user.profilePicture = profilePicture;
        }

        await user.save();
        res.status(200).json(
            {
                success: true,
                message: "Profile updated",
                data: user
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Profile could not be updated",
                error: error
            }
        )
    }
}

export const deleteUserById = async (req, res) => {
    try {
        const targetUserId = req.params.id;
        const targetUser = await User.findOne(
            { 
                _id: targetUserId 
            }
        );
        if (!targetUser) {
            return res.status(400).json(
                { 
                    message: "User not found" 
                }
            );
        }
        await User.deleteOne({ _id: targetUserId });

        res.status(200).json(
            {
                success: true,
                message: "User deleted",
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Profile could not be updated",
                error: error
            }
        )
    }
}

export const deactivateProfile = async (req, res) => {
    try {
        const userId = req.tokenData.userId;
        const password = req.body.password;
        const user = await User.findOne(
            { 
                _id: userId 
            },
            "+password +isActive"
        );
        // NOT NEEDED
        if (!user) {
            return res.status(400).json(
                { 
                    message: "User not found" 
                }
            );
        }

        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).json(
                { 
                    message: "Invalid password" 
                }
            );
        }

        user.isActive = false;
        await user.save();

        res.status(200).json(
            {
                success: true,
                message: "User deactivated",
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Profile could not be updated",
                error: error
            }
        )
    }
}

export const getPostsByUserId = async (req, res) => {
    try {
        const limit = 10
        const page = req.query.page || 1;
        const skip = (page - 1) * limit;

        const userId = req.params.id;
        const posts = await Post.find(
            {
                author: userId
            }
        ).sort(
            { 
                createdAt: -1
            }
        ).skip(skip)
        .limit(limit);

        res.status(200).json(
            { 
                success: true,
                message: "The posts were retrieved successfully",
                data: posts,
                prev_page: page > 1 ? page - 1 : null,
                next_page: page < Math.ceil(posts.length / limit) ? page + 1 : null,
                page: page
            }
        );
    } catch (error) {
        res.status(500).json(
            { 
                success: false,
                message: "The posts could not be retrieved",
                error: error.message
            }
        );        
    }
}

export const getSavedPosts = async (req, res) => {
    try {
        const limit = 10
        const page = req.query.page || 1;
        const skip = (page - 1) * limit;
        const userId = req.tokenData.userId;
        const user = await User.findOne(
            { 
                _id: userId 
            }
        ).populate(
            "saved"
        ).skip(skip)
        .limit(limit);

        const savedPosts = user.saved;

        res.status(200).json(
            { 
                success: true,
                message: "Saved posts retrieved successfully",
                data: savedPosts
            }
        );
    } catch (error) {
        res.status(500).json(
            { 
                success: false,
                message: "Saved posts could not be retrieved",
                error: error.message
            }
        );
    }
}