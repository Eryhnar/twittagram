import User from "./user-model.js"

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
        console.error(error);
        throw new Error("Error updating the user");
    }
}