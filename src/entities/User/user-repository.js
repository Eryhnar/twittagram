import User from "./user-model.js"
import UndefinedError from "../../utils/errors/UndefinedError.js"

export const findUsers = async (searchFilters) => {
    try {
        return await User.find(
            searchFilters,
        )
    } catch (error) {
        throw error
    }
}

export const findUserById = async (userId, limit, skip) => {
    try {
        return await User.findOne(
            { 
                _id: userId
            }
        ).skip(skip)
        .limit(limit);
    } catch (error) {
        throw error;
    }
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
        throw error;
    }
}

export const getUserToUpdate = async (userId) => {
    try {
        const user = await User.findOne(
            { 
                _id: userId
            },
            "+password +isActive +role"
        );
        return user;
    } catch (error) {
        throw error;
    }
}

//TODO review might not work
// export const updateUser = async (user, updatedFields) => {
//     try {
//         Object.assign(user, updatedFields);
//         const updatedUser = await user.save();
//         return updatedUser;
//     } catch (error) {
//         throw new UndefinedError("Error updating the user", error);
//     }
// }

export const updateUser = async (userId, updatedFields) => {
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
    }
    catch (error) {
        throw error;
    }
}

export const deleteUser = async (userId) => {
    try {
        await User.deleteOne(
            { 
                _id: userId
            }
        );
    } catch (error) {
        throw error;
    }
}