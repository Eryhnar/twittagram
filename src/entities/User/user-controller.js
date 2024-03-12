import User from "./user-model.js";

export const getUsers = async (req, res) => {
    try {
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