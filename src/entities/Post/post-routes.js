import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { isSuperadmin } from "../../middlewares/isSuperadmin.js";
import { createPost, deletePostById, getOwnPosts, getPostById, getPosts, getPostsByUserId, getTimeline, updatePost } from "./post-controller.js";

const router = Router();

router.get('/', auth, isSuperadmin, getPosts); //admin
router.get('/timeline', auth, getTimeline);
router.post('/', auth, createPost);
router.put("/" , auth, updatePost);
router.get("/own", auth, getOwnPosts); 
router.get("/:id", auth, getPostById); 
//saved
router.delete("/:id", auth, deletePostById);
//user-id
router.get("/:user-id", auth, getPostsByUserId); 
export default router;