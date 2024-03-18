import { findUsers, updateProfile, findUserById, updateUser, deleteUser, getUserToUpdate } from "./user-repository.js";
import isValidUserName from "../../utils/validators/isValidUserName.js";
import isValidBio from "../../utils/validators/isValidBio.js";
import isValidEmail from "../../utils/validators/isValidEmail.js";
import isValidImageUrl from "../../utils/validators/isValidImageUrl.js";
import isValidPassword from "../../utils/validators/isValidPassword.js";
import comparePassword from "../../utils/treatment-utils/comparePassword.js";
import hashPassword from "../../utils/treatment-utils/hashPassword.js";
import UnauthorizedError from "../../utils/errors/UnauthorizedError.js";
import InvalidInputError from "../../utils/errors/InvalidInputError.js";
import NotFoundError from "../../utils/errors/NotFoundError.js";
import isValidId from "../../utils/validators/IsValidId.js";
import { findPosts } from "../Post/post-repository.js";
import { updateUserById } from "./user-controller.js";


export const getProfileService = async (req) => {
    try {
        const user = await findUserById(req.tokenData.userId);
        return user;
    }
    catch (error) {
        throw error;
    }
}

export const getUsersService = async (query, limit, page, skip) => {
    try{
        if (isNaN(page) || page <= 0) { //TODO abstract it to a function maybe
            return res.status(400).json(
                { 
                    success: false,
                    message: "Invalid page number"
                }
            );
        }
        const { userName, userHandle, email, role, isActive} = query;
        const searchFilters = {}
        if (userName) {
            searchFilters.userName = { $regex: userName, $options: "i" };
        }
        if (userHandle) {
            searchFilters.userHandle = { $regex: userHandle, $options: "i" };
        }
        if (email) {
            searchFilters.email = { $regex: email, $options: "i" };
        }
        if (role) {
            searchFilters.role = role;
        }
        if (isActive) {
            searchFilters.isActive = isActive;
        }
        return findUsers(searchFilters, skip, limit);
    }
    catch (error) {
        return error;
    }
}

export const updateProfileService = async (req) => {
    try {
        const userId = req.tokenData.userId;
        const { userName, email, bio, profilePicture } = req.body;
        const updatedFields = {};
        if (userName && !isValidUserName(userName)) {
            throw new InvalidInputError(400, "Invalid user name");
        }
        updatedFields.userName = userName;
        
        if (email && !isValidEmail(email)) {
            throw new InvalidInputError(400, "Invalid email");
        }
        updatedFields.email = email;

        if (bio && !isValidBio(bio)) {
            throw new InvalidInputError(400, "Invalid bio");
        }
        updatedFields.bio = bio;

        if (profilePicture && !isValidImageUrl(profilePicture)) {
            throw new InvalidInputError(400, "Invalid profile picture");
        }
        updatedFields.profilePicture = profilePicture;
        const updatedUser = await updateProfile(userId, updatedFields);
        return updatedUser;
    } catch (error) {
        throw new Error(error);
    }
}

export const updatePasswordService = async (req) => {
    try {
        const userId = req.tokenData.userId;
        const { oldPassword, newPassword, newPasswordRepeat } = req.body;
        
        if (!isValidPassword(newPassword) || !isValidPassword(newPasswordRepeat) || !isValidPassword(oldPassword)) {
            throw new InvalidInputError(400, "The password must have at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character");
        }
        if (newPassword !== newPasswordRepeat) {
            throw new InvalidInputError(400, "Passwords do not match");
        }
        if (oldPassword === newPassword) {
            throw new InvalidInputError(400, "New password must be different from old password");
        }
        const user = await getUserToUpdate(userId);
        if (!user) {
            throw new InvalidInputError(400, "User does not exist");
        }
        if (!await comparePassword(oldPassword, user.password)) {
            throw new UnauthorizedError(400, "Invalid credentials");
        }
        const hashedPassword = await hashPassword(newPassword);
        const updatedUser = await updateProfile(userId, { password: hashedPassword });
        return updatedUser;
    } catch (error) {
        throw error;
    }
}

export const updateUserByIdService = async (req) => {
    try {
        const targetUserId = req.params.id;
        const { userName, email, role, isActive, bio, profilePicture } = req.body;
        const updateFields = {};

        if (!isValidId(targetUserId)) {
            throw new InvalidInputError(400, "Invalid user id");
        }

        if (userName) {
            if (!isValidUserName(userName)) {
                throw new InvalidInputError(400, "Invalid user name");
            }
            updateFields.userName = userName;
        }

        if (email) {
            if (!isValidEmail(email)) {
                throw new InvalidInputError(400, "Invalid email");
            }
            updateFields.email = email;
        }

        if (role) {
            if (!["user", "admin", "superadmin"].includes(role)) {
                throw new InvalidInputError(400, "Invalid role");
            }
            updateFields.role = role;
        }

        if (bio) {
            if (!isValidBio(bio)) {
                throw new InvalidInputError(400, "Invalid bio");
            }
            updateFields.bio = bio;
        }

        if (profilePicture) {
            if (!isValidImageUrl(profilePicture)) {
                throw new InvalidInputError(400, "Invalid profile picture");
            }
            updateFields.profilePicture = profilePicture;
        }

        if (isActive !== undefined) {
            if (typeof isActive !== "boolean") {
                throw new InvalidInputError(400, "Invalid isActive");
            }
            updateFields.isActive = isActive;
        }

        const user = await getUserToUpdate(targetUserId);
        if (!user) {
            throw new NotFoundError(404, "User not found");
        }

        const newProfile = await updateUser(user, updateFields);
        return newProfile;
    } catch (error) {
        throw error;
    }
}

export const deleteUserByIdService = async (req) => {
    try {
        const targetUserId = req.params.id;
        if (!targetUserId || !isValidId(targetUserId)) {
            throw new InvalidInputError(400, "Invalid user id");
        }
        //TODO remove??
        const targetUser = await findUserById(targetUserId);
        if (!targetUser) {
            throw new NotFoundError(404, "User not found");
        }
        await deleteUser(targetUserId);
    } catch (error) {
        throw error;
    }
}

export const deactivateProfileService = async (req) => {
    try {
        const userId = req.tokenData.userId;
        const password = req.body.password;
        const user = await getUserToUpdate(userId);
        // const updatedFields = {};

        // NOT NEEDED
        if (!user) {
            throw new NotFoundError(404, "User not found");
        }

        if (!await comparePassword(password, user.password)) {
            throw new UnauthorizedError(400, "Invalid credentials");
        }

        const isActive = {isActive: false};
        await updateUser(user, isActive);
    } catch (error) {
        throw error;
    }
}

export const getPostsByUserIdService = async (req, limit, skip, page) => {
    try {
        const authorId = req.params.id;
        const userId = req.tokenData.userId;
        if (isNaN(page) || page <= 0) { //TODO abstract it to a function maybe
            return res.status(400).json(
                { 
                    success: false,
                    message: "Invalid page number"
                }
            );
        }

        if (!authorId || !isValidId(authorId)) {
            throw new InvalidInputError(400, "Invalid user id");
        }
        const posts = await findPosts(
            { 
                author: authorId
            },
            skip,
            limit,
            userId
        )

        return posts;
    } catch (error) {
        throw error;
    }
}
    
export const getSavedPostsService = async (req, limit, skip, page) => {
    try {
        // TODO check best way to handle wrong page
        // if (isNaN(page) || page <= 0) {
        //     page = 1;
        // }
        if (isNaN(page) || page <= 0) { //TODO abstract it to a function maybe
            return res.status(400).json(
                { 
                    success: false,
                    message: "Invalid page number"
                }
            );
        }
        const userId = req.tokenData.userId;
        const user = await findUserById(userId);
        const posts = await findPosts(
            { 
                _id: { $in: user.saved } 
            },
            skip,
            limit,
        )
        return posts;
    } catch (error) {
        throw error;
    }
}

export const toggleFollowService = async (req) => {
    try {
        const userId = req.tokenData.userId;
        const targetUserId = req.body.targetUserId;
        if (!targetUserId || !isValidId(targetUserId)) {
            throw new InvalidInputError(400, "Invalid user id");
        }
        const user = await findUserById(userId);
        const targetUser = await findUserById(targetUserId);
        if (!targetUser) {
            throw new NotFoundError(404, "User not found");
        }
        if (user.following.includes(targetUserId)) {
            user.following.pull(targetUserId);
            targetUser.followers.pull(userId);
        } else {
            user.following.push(targetUserId);
            targetUser.followers.push(userId);
        }
        await updateUser(targetUserId, targetUser);
        return updateUser(userId, user);
        // await user.save();
        // await targetUser.save();
    } catch (error) {
        throw error;
    }
}