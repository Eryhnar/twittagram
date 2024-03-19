import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { isSuperadmin } from "../../middlewares/isSuperadmin.js";
import { createPost, deletePostById, getOwnPosts, getPostById, getPosts, getTimeline, savePost, toggleLike, updatePost } from "./post-controller.js";
import errorHandler from "../../middlewares/errorHandler.js";

const router = Router();
// reorder from long to short
router.post("/", auth, createPost, errorHandler);
router.get("/", auth, isSuperadmin, getPosts, errorHandler); //admin
router.put("/", auth, updatePost, errorHandler);
router.get("/timeline", auth, getTimeline, errorHandler);
router.get("/own", auth, getOwnPosts, errorHandler);
router.put("/like", auth, toggleLike, errorHandler); //Todo id/like
router.put("/save", auth, savePost, errorHandler); // is it ok here or user? //Todo MOVE TO USER
router.get("/:id", auth, getPostById, errorHandler);
router.delete("/:id", auth, deletePostById, errorHandler);
//router.get("/:user-id", auth, getPostsByUserId); 
//delete post admin TODO to be added /???
//update post admin TODO to be added /:id PUT

export default router;