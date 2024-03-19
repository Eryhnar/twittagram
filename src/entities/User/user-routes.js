import { Router } from "express";
import { deactivateProfile, deleteUserById, getPostsByUserId, getProfile, getSavedPosts, getUsers, toggleFollow, updateProfile, updateProfilePassword, updateUserById } from "./user-controller.js";
import { auth } from "../../middlewares/auth.js";
import { isSuperadmin } from "../../middlewares/isSuperadmin.js";
import errorHandler from "../../middlewares/errorHandler.js";

const router = Router();

//router.get("/", getUsers); //reimplement as search
router.get("/", auth, isSuperadmin, getUsers, errorHandler); //admin
router.get("/profile", auth, getProfile, errorHandler);
router.put("/profile", auth, updateProfile, errorHandler);
router.put("/profile/deactivate", auth, deactivateProfile, errorHandler);
router.put("/profile/password", auth, updateProfilePassword, errorHandler);
router.put("/follow", auth, toggleFollow, errorHandler);
router.get("/saved" , auth, getSavedPosts, errorHandler); 
router.get("/posts/:id", auth, getPostsByUserId, errorHandler); // todo consider modifying route to add it to posts.
router.put("/:id", auth, isSuperadmin, updateUserById, errorHandler); //admin NEEDS VALIDATIONS
router.delete("/:id", auth, isSuperadmin, deleteUserById, errorHandler); //admin SHOULD NOT DELETE EVERYTHING
//add soft delete user route

export default router;