import { Router } from "express";
import { deactivateProfile, deleteUserById, getProfile, getUsers, updateProfile, updateProfilePassword, updateUserById } from "./user-controller.js";
import { auth } from "../../middlewares/auth.js";

const router = Router();

//router.get('/', getUsers); //reimplement as search
router.get('/', getUsers); //admin
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.put("/profile/deactivate", auth, deactivateProfile);
router.put("/profile/password", auth, updateProfilePassword);
router.put('/:id', auth, updateUserById); //admin NEEDS VALIDATIONS
router.delete('/:id', auth, deleteUserById); //admin SHOULD NOT DELETE EVERYTHING

export default router;