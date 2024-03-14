import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { isSuperadmin } from "../../middlewares/isSuperadmin.js";
import { createPost, getPosts, getTimeline } from "./post-controller.js";

const router = Router();

router.get('/', auth, isSuperadmin, getPosts); //admin
router.get('/timeline', auth, getTimeline);
router.post('/', auth, createPost);

export default router;