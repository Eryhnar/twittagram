import { Router } from "express";
import { deactivateProfile, deleteUserById, getPostsByUserId, getProfile, getSavedPosts, getUsers, toggleFollow, updateProfile, updateProfilePassword, updateUserById } from "./user-controller.js";
import { auth } from "../../middlewares/auth.js";
import { isSuperadmin } from "../../middlewares/isSuperadmin.js";

const router = Router();

//router.get("/", getUsers); //reimplement as search
router.get("/", auth, isSuperadmin, getUsers); //admin
router.get("/profile", auth, getProfile);
router.put("/profile", auth, updateProfile);
router.put("/profile/deactivate", auth, deactivateProfile);
router.put("/profile/password", auth, updateProfilePassword);
router.put("/follow", auth, toggleFollow);
router.get("/saved" , auth, getSavedPosts); 
router.get("/posts/:id", auth, getPostsByUserId); // todo consider modifying route to add it to posts.
router.put("/:id", auth, isSuperadmin, updateUserById); //admin NEEDS VALIDATIONS
router.delete("/:id", auth, isSuperadmin, deleteUserById); //admin SHOULD NOT DELETE EVERYTHING
//add soft delete user route

export default router;