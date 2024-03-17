import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { isSuperadmin } from "../../middlewares/isSuperadmin.js";
import { getComments, postComment, postReply } from "./comment-controller.js";


const router = Router();

//post comment
router.post("/", auth, postComment); // review
//post reply
router.post("/reply", auth, postReply); // review
//get comments
router.get("/", auth, getComments)
//get replies
//delete comment
//delete reply
//like comment
//like reply
//update comment
//update reply



export default router;