import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { isSuperadmin } from "../../middlewares/isSuperadmin.js";
import { postComment } from "./comment-controller.js";


const router = Router();

//post comment
router.post("/", auth, postComment); // review
//post reply
//get comments
//get replies
//delete comment
//delete reply
//like comment
//like reply
//update comment
//update reply



export default router;