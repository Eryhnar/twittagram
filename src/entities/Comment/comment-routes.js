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
router.put("/delete", auth, deleteComment) //TODO turn into a put request
//delete reply
router.put("/reply/delete", auth, deleteReply) //TODO turn into a put request
//like comment
//like reply
//update comment
//update reply



export default router;