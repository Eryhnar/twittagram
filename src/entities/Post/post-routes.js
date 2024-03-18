import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { isSuperadmin } from "../../middlewares/isSuperadmin.js";
import { createPost, deletePostById, getOwnPosts, getPostById, getPosts, getTimeline, savePost, toggleLike, updatePost } from "./post-controller.js";

const router = Router();
// reorder from long to short
router.post("/", auth, createPost);
router.get("/", auth, isSuperadmin, getPosts); //admin
router.put("/" , auth, updatePost); 
router.get("/timeline", auth, getTimeline);
router.get("/own", auth, getOwnPosts); 
router.put("/like/:id", auth, toggleLike); //Todo id/like
router.put("/save/:id", auth, savePost); // is it ok here or user? //Todo id/save
router.get("/:id", auth, getPostById); 
router.delete("/:id", auth, deletePostById);
//router.get("/:user-id", auth, getPostsByUserId); 
//delete post admin TODO to be added /???
//update post admin TODO to be added /:id PUT

export default router;