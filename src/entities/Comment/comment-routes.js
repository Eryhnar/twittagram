import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { isSuperadmin } from "../../middlewares/isSuperadmin.js";
import { deleteComment, likeComment, postComment, postReply, updateComment } from "./comment-controller.js";
import errorHandler from "../../middlewares/errorHandler.js";


const router = Router();

//post comment
router.post("/", auth, postComment, errorHandler); // review
//post reply
router.post("/reply", auth, postReply, errorHandler); // review
//get comments
// router.get("/", auth, getComments) // not needed for now
//get replies
//delete comment
router.put("/delete", auth, deleteComment, errorHandler) 
//delete reply
// router.put("/reply/delete", auth, deleteReply) //redundant
//like comment
router.put("/like", auth, likeComment, errorHandler) 
//like reply
// router.put("/reply/like", auth, likeReply)
//update comment
router.put("/", auth, updateComment, errorHandler)
//update reply
// router.put("/reply", auth, updateReply)



export default router;