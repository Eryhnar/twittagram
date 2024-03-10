import jwt from "jsonwebtoken";
import { User } from "../entities/User/user-model.js";

export const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];


        if (!token) {
            return res.status(401).json(
                {
                    success: false,
                    message: "Unauthorized"
                }
            )
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )


        req.tokenData = decoded;
        const { userId } = req.tokenData;
        const user = await User.findOne(
            { 
                _id: userId
            }
        );

        const { isActive, ...tokenUser } = user;

        // verify if user exists and is active and role matches the token
        // TODO verify token in session database
        if (!user || !user.isActive) {
            return res.status(401).json(
                {
                    success: false,
                    message: "Unauthorized"
                }
            );
        }

        req.body.tokenUser = tokenUser;
        next();
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "JWT NOT VALID OR MALFORMED",
                error: error
            }
        )
    }
}