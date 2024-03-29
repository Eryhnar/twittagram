import { Router } from "express";
import authRoutes from "./authentication/auth-routes.js";
import userRoutes from "./entities/User/user-routes.js";
import postRoutes from "./entities/Post/post-routes.js";
import commentRoutes from "./entities/Comment/comment-routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);

export default router;