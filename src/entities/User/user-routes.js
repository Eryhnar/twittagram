import { Router } from "express";
import { getProfile, getUsersAdmin, updateProfile } from "./user-controller.js";
import { auth } from "../../middlewares/auth.js";

const router = Router();

//router.get('/', getUsers);
router.get('/admin', getUsersAdmin);
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);

export default router;