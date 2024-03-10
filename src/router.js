import { Router } from "express";
import authRoutes from "./authentication/auth-routes.js";

const router = Router();

router.use("/auth", authRoutes);

export default router;