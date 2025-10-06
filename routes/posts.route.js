import { Router } from "express";
import { createPost, listPosts, likePost } from "../controllers/postController.js";
import { protect } from "../middleware/auth.js";

const postRouter = Router({ mergeParams: true }); // mergeParams needed to access community name

// Create post → protected
postRouter.post("/", protect, createPost);

// List posts → public
postRouter.get("/", listPosts);

// Like/unlike → protected
postRouter.patch("/:id/like", protect, likePost);

export default postRouter;
