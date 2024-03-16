import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { isSuperadmin } from "../../middlewares/isSuperadmin.js";
import { createPost, deletePostById, getOwnPosts, getPostById, getPosts, getTimeline, savePost, toggleLike, updatePost } from "./post-controller.js";

const router = Router();
// reorder from long to short
router.get("/", auth, isSuperadmin, getPosts); //admin
router.get("/timeline", auth, getTimeline);
router.post("/", auth, createPost);
router.put("/" , auth, updatePost); 
router.get("/own", auth, getOwnPosts); 
router.get("/:id", auth, getPostById); 
router.put("/save/:id", auth, savePost); // is it ok here or user? //Todo id/save
router.delete("/:id", auth, deletePostById);
//router.get("/:user-id", auth, getPostsByUserId); 
router.put("/like/:id", auth, toggleLike); //Todo id/like
//delete post admin TODO to be added /???
//update post admin TODO to be added /:id PUT

export default router;