import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { isSuperadmin } from "../../middlewares/isSuperadmin.js";
import { deleteComment, likeComment, postComment, postReply, updateComment, updateReply } from "./comment-controller.js";


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
// router.put("/reply/delete", auth, deleteReply) //redundant
//like comment
router.put("/like", auth, likeComment) 
//like reply
// router.put("/reply/like", auth, likeReply)
//update comment
router.put("/", auth, updateComment)
//update reply
router.put("/reply", auth, updateReply)



export default router;