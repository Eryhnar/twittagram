import Post from "../Post/post-model.js";
import User from "./user-model.js";
import bcrypt from "bcrypt";
import { getUsersService, updateProfileService, updatePasswordService, updateUserByIdService, deleteUserByIdService, deactivateProfileService, getPostsByUserIdService } from "./user-service.js";

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

        const user = req.tokenUser

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
        const user = await updateUserByIdService(req);
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
        deleteUserByIdService(req);

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
                message: "Profile could not be deleted",
                error: error
            }
        )
    }
}

export const deactivateProfile = async (req, res) => {
    try {
        deactivateProfileService(req);

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

        const posts = await getPostsByUserIdService(req, limit, skip);

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