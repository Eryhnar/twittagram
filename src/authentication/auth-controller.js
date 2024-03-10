import User from "../entities/User/user-model.js";

export const register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        if (!userName || !email || !password) {
            return res.status(400).json(
                { 
                    success: false,
                    message: "All fields are required"
                }
            );
        }

        const userHandle = "@" + userName.trim().toLowerCase();

        if (await User.findOne ({ userHandle })) {
            return res.status(400).json(
                { 
                    success: false,
                    message: "User already exists"
                }
            );
        }

        if (await User.findOne ({ email })) {
            return res.status(400).json(
                { 
                    success: false,
                    message: "User with this email already exists"
                }
            );
        }

        const user = await User.create({ userHandle, userName, email, password });

        res.status(201).json(
            { 
                success: true,
                message: "User created successfully",
                data: user
            }
        );
    } catch (error) {
        res.status(500).json(
            { 
                success: false,
                message: "Internal server error",
                error: error.message
            }
        );
    }
}