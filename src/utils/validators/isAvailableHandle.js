import User from "../../entities/User/user-model";

const isAvailableHandle = async (handle) => {
    try {
        const user = await User.findOne(
            {
                userHandle: handle
            }
        );
        if (user) {
            return false;
        }
        return true;
    } catch (error) {
        throw new UndefinedError("Error checking handle availability");
    }
}

export default isAvailableHandle;
