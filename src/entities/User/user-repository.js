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

export const getUserToUpdate = async (userId) => {
    const user = await User.findOne(
        { 
            _id: userId
        },
        "+password +isActive +role"
    );
    return user;
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
        throw new UndefinedError("Error updating the user", error);
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
        throw new UndefinedError("Error deleting the user", error);
    }
}