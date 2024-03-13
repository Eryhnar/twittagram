import User from "../entities/User/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ userHandle, userName, email, password: hashedPassword });

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

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json(
                { 
                    success: false,
                    message: "All fields are required"
                }
            );
        }
        console.log(email);
        const user = await User.findOne(
            { 
                email 
            },
            "+role +password"
        );
        console.log(user);
        if (!user) {
            return res.status(400).json(
                { 
                    success: false,
                    message: "User does not exist"
                }
            );
        }

        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).json(
                { 
                    success: false,
                    message: "Invalid credentials"
                }
            );
        }

        const token = jwt.sign(
            { 
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { 
                expiresIn: "2h"
            }
        );

        res.status(200).json(
            { 
                success: true,
                message: "Login successful",
                token: token
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

