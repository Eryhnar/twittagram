import { Router } from "express";
import { deleteUserById, getProfile, getUsersAdmin, updateProfile, updateUserById } from "./user-controller.js";
import { auth } from "../../middlewares/auth.js";

const router = Router();

//router.get('/', getUsers);
router.get('/', getUsersAdmin); //admin
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.put('/:id', auth, updateUserById); //admin
router.delete('/:id', auth, deleteUserById); //admin

export default router;