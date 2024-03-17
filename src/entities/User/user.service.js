import { findUsers } from "./user-repository";

export const getUsersService = async (req, res) => {
    try{
        const { userName, userHandle, email, role, isActive} = req.query;
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
        //errorHandler(error, res);
    }
}