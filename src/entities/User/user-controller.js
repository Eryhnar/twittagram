import User from "./user-model.js";

export const getUsersAdmin = async (req, res) => {
    try {
        //optional fields to filter by
        const { userName, userHandle, email, role, isActive} = req.query;
        const searchFilters = {}
        if (userName) {
            searchFilters.userName = { $regex: userName, $options: 'i' };
        }
        if (userHandle) {
            searchFilters.userHandle = { $regex: userHandle, $options: 'i' };
        }
        if (email) {
            searchFilters.email = { $regex: email, $options: 'i' };
        }
        if (role) {
            searchFilters.role = role;
        }
        if (isActive) {
            searchFilters.isActive = isActive;
        }
        const users = await User.find(
            searchFilters,
            "-password"
        )
        
        return res.status(200).json(
            {
                success: true,
                message: "Users retrived",
                data: users
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Users could not be retrived",
                error: error
            }
        )
    }
}
/*
export const getUsers = async (req, res) => { //search bar
    try {
        //optional fields to filter by
        const { userName, userHandle } = req.query;
        const user = await User.find(
            {

            },
        )
        return res.status(201).json(
            {
                success: true,
                message: "Users retrived",
                //data: user
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Users could not be retrived",
                error: error
            }
        )
    }
}
*/
// const user = await User.find({}, { bio: true, isActive: true });
// const user = await User.find({}, 'bio isActive');

export const getProfile = async (req, res) => {
    try {
        res.status(200).json(
            {
                success: true,
                message: "Profile retrived",
                data: req.user
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