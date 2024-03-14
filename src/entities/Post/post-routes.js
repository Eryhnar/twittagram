import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { isSuperadmin } from "../../middlewares/isSuperadmin.js";
import { getPosts } from "./post-controller.js";

const router = Router();

router.get('/', getPosts);

export default router;