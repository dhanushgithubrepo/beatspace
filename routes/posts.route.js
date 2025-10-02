import { Router } from "express";
import { createPost, listPosts, likePost } from "../controllers/postController.js";

const postRouter = Router({ mergeParams: true }); // mergeParams needed to access community name

postRouter.post("/", createPost);
postRouter.get("/", listPosts);
postRouter.patch("/:id/like", likePost);

export default postRouter;
