import { Router } from "express";
import { createPost, getPostsByCommunity, likePost } from "../controllers/postController.js";
import { protect } from "../middleware/auth.js";

const postRouter = Router({ mergeParams: true }); // ✅ mergeParams to access :name from parent

// ✅ Get posts for a specific community
postRouter.get("/", getPostsByCommunity);

// ✅ Create post in a community → protected
postRouter.post("/", protect, createPost);

// ✅ Like/unlike a post → protected
postRouter.patch("/:id/like", protect, likePost);

export default postRouter;
