import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { isSuperadmin } from "../../middlewares/isSuperadmin.js";
import { deleteComment, deleteReply, postComment, postReply } from "./comment-controller.js";


const router = Router();

//post comment
router.post("/", auth, postComment); // review
//post reply
router.post("/reply", auth, postReply); // review
//get comments
// router.get("/", auth, getComments) // not needed for now
//get replies
//delete comment
router.delete("/", auth, deleteComment)
//delete reply
router.delete("/reply", auth, deleteReply)
//like comment
//like reply
//update comment
//update reply



export default router;