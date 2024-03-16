import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { isSuperadmin } from "../../middlewares/isSuperadmin.js";
import { createPost, deletePostById, getOwnPosts, getPostById, getPosts, getTimeline, savePost, toggleLike, updatePost } from "./post-controller.js";

const router = Router();

router.get("/", auth, isSuperadmin, getPosts); //admin
router.get("/timeline", auth, getTimeline);
router.post("/", auth, createPost);
router.put("/" , auth, updatePost);
router.get("/own", auth, getOwnPosts); 
router.get("/:id", auth, getPostById); 
//save post
router.put("/save/:id", auth, savePost);
router.delete("/:id", auth, deletePostById);
//router.get("/:user-id", auth, getPostsByUserId); 
router.put("/like/:id", auth, toggleLike);
//delete post admin
//update post admin

export default router;