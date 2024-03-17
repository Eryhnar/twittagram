import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { isSuperadmin } from "../../middlewares/isSuperadmin.js";
import { deleteComment, deleteReply, likeComment, likeReply, postComment, postReply } from "./comment-controller.js";


const router = Router();

//post comment
router.post("/", auth, postComment); // review
//post reply
router.post("/reply", auth, postReply); // review
//get comments
// router.get("/", auth, getComments) // not needed for now
//get replies
//delete comment
router.put("/delete", auth, deleteComment) 
//delete reply
router.put("/reply/delete", auth, deleteReply) 
//like comment
router.put("/like", auth, likeComment) 
//like reply
router.put("/reply/like", auth, likeReply)
//update comment
//update reply



export default router;