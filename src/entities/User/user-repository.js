import User from "./user-model.js"
import UndefinedError from "../../utils/errors/UndefinedError.js"

export const findUsers = async (searchFilters) => {
    return await User.find(
        searchFilters,
    )
}

export const findUserById = async (userId) => {
    return await User.findOne(
        { 
            _id: userId
        }
    )
}

export const updateProfile = async (userId, updatedFields) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { 
                _id: userId
            },
            updatedFields,
            { 
                new: true
            }
        );
        return updatedUser;
    } catch (error) {
        throw new UndefinedError("Error updating the user");
    }
}

export const getUserWithPassword = async (userId) => {
    const user = await User.findOne(
        { 
            _id: userId
        },
        "+password"
    );
    return user;
}