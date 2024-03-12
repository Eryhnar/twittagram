import { Router } from "express";
import authRoutes from "./authentication/auth-routes.js";
import userRoutes from "./entities/User/user-routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

export default router;