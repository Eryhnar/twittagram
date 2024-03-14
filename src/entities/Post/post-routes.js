import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { isSuperadmin } from "../../middlewares/isSuperadmin.js";
import { createPost, getPosts, getTimeline, updatePost } from "./post-controller.js";

const router = Router();

router.get('/', auth, isSuperadmin, getPosts); //admin
router.get('/timeline', auth, getTimeline);
router.post('/', auth, createPost);
router.put("/" , auth, updatePost);

export default router;