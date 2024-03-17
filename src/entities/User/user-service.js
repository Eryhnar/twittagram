import { findUsers, updateProfile, getUserWithPassword } from "./user-repository.js";
import isValidUserName from "../../utils/validators/isValidUserName.js";
import isValidBio from "../../utils/validators/isValidBio.js";
import isValidEmail from "../../utils/validators/isValidEmail.js";
import isValidImageUrl from "../../utils/validators/isValidImageUrl.js";
import isValidPassword from "../../utils/validators/isValidPassword.js";
import comparePassword from "../../utils/treatment-utils/comparePassword.js";
import hashPassword from "../../utils/treatment-utils/hashPassword.js";
import UnauthorizedError from "../../utils/errors/UnauthorizedError.js";
import InvalidInputError from "../../utils/errors/InvalidInputError.js";


export const getUsersService = async (query) => {
    try{
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
        return findUsers(searchFilters);
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
        const user = await getUserWithPassword(userId);
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
    