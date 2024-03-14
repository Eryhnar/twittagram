import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { isSuperadmin } from "../../middlewares/isSuperadmin.js";
import { getPosts, getTimeline } from "./post-controller.js";

const router = Router();

router.get('/', auth, getTimeline);

export default router;