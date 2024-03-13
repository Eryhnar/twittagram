import { Router } from "express";
import { getUsersAdmin } from "./user-controller.js";

const router = Router();

//router.get('/', getUsers);
router.get('/admin', getUsersAdmin);
router.get('/profile', getProfile);

export default router;