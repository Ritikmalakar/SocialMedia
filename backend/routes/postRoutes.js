import express from 'express';
import { commentPost, createPost, getAll, likePost, searchUser } from '../controller/PostController.js';
import upload from '../middleware/upload.js';




const router=express.Router();
router.post("/posting",upload.single('image'),createPost);
router.get('/getAll',getAll)
router.put(
  "/like/:id",
likePost
);
router.get("/search", searchUser);

router.post( "/comment/:id", commentPost );
export default router;