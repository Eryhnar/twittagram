import { getUsersService, updateProfileService, updatePasswordService, updateUserByIdService, deleteUserByIdService, deactivateProfileService, getPostsByUserIdService, getSavedPostsService, getProfileService, toggleFollowService } from "./user-service.js";

export const getUsers = async (req, res, next) => {
    try {
        const limit = 10
        const page = req.query.page || 1;
        const skip = (page - 1) * limit;
        const users = await getUsersService(req.query, limit, page, skip)
        
        res.status(200).json(
            {
                success: true,
                message: "Users retrived",
                data: users,
                prev_page: page > 1 ? page - 1 : null,
                next_page: page < Math.ceil(allPosts.length / limit) ? page + 1 : null,
                page: page
            }
        )
    } catch (error) {
        next(error);
    }
}

export const getProfile = async (req, res, next) => {
    try {

        const user = await getProfileService(req)

        res.status(200).json(
            {
                success: true,
                message: "Profile retrived",
                data: user
            }
        )
    } catch (error) {
        next(error);
    }
}

export const updateProfile = async (req, res, next) => {
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
        next(error);
    }
}

export const updateProfilePassword = async (req, res, next) => {
    try {
        const updatedUser = await updatePasswordService(req);

        res.status(200).json(
            {
                success: true,
                message: "Profile updated",
            }
        )
    } catch (error) {
        next(error);
    }
}

export const updateUserById = async (req, res, next) => {
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
        next(error);
    }
}

export const deleteUserById = async (req, res, next) => {
    try {
        deleteUserByIdService(req);

        res.status(200).json(
            {
                success: true,
                message: "User deleted",
            }
        )
    } catch (error) {
        next(error);
    }
}

export const deactivateProfile = async (req, res, next) => {
    try {
        deactivateProfileService(req);

        res.status(200).json(
            {
                success: true,
                message: "User deactivated",
            }
        )
    } catch (error) {
        next(error);
    }
}

export const getPostsByUserId = async (req, res, next) => {
    try {
        const limit = 10
        const page = req.query.page || 1;
        const skip = (page - 1) * limit;

        const posts = await getPostsByUserIdService(req, limit, skip, page);

        res.status(200).json(
            { 
                success: true,
                message: "The posts were retrieved successfully",
                data: posts,
                prev_page: page > 1 ? page - 1 : null,
                next_page: page < Math.ceil(allPosts.length / limit) ? page + 1 : null,
                page: page
            }
        );
    } catch (error) {
        next(error);      
    }
}

export const getSavedPosts = async (req, res, next) => {
    try {
        const limit = 10
        const page = req.query.page || 1;
        const skip = (page - 1) * limit;

        const savedPosts = await getSavedPostsService(req, limit, skip, page);

        res.status(200).json(
            { 
                success: true,
                message: "Saved posts retrieved successfully",
                data: savedPosts,
                prev_page: page > 1 ? page - 1 : null,
                next_page: page < Math.ceil(allPosts.length / limit) ? page + 1 : null,
                page: page
            }
        );
    } catch (error) {
        next(error);
    }
}

export const toggleFollow = async (req, res, next) => {
    try {
        const user = await toggleFollowService(req);
        res.status(200).json(
            { 
                success: true,
                message: "Follow toggled successfully",
                data: user
            }
        );
    } catch (error) {
        next(error);
    }
}