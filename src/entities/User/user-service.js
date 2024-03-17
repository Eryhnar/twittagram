import { findUsers, updateProfile } from "./user-repository.js";
import isValidUserName from "../../utils/validators/isValidUserName.js";
import isValidBio from "../../utils/validators/isValidBio.js";
import isValidEmail from "../../utils/validators/isValidEmail.js";
import isValidImageUrl from "../../utils/validators/isValidImageUrl.js";

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
    