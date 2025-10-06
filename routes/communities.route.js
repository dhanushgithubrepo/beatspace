import { Router } from "express";
import {
  createCommunity,
  listCommunities,
  joinCommunity,
  leaveCommunity,
} from "../controllers/communityController.js";
import postRouter from "../routes/posts.route.js";
import { protect } from "../middleware/auth.js";

const communityRouter = Router();

// Create a new community → protected
communityRouter.post("/", protect, createCommunity);

// List all communities → public
communityRouter.get("/", listCommunities);

// Join a community by name → protected
communityRouter.post("/:name/join", protect, joinCommunity);

// Leave a community by name → protected
communityRouter.post("/:name/leave", protect, leaveCommunity);

// Nested posts routes
communityRouter.use("/:name/posts", postRouter);

export default communityRouter;
