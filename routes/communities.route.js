import { Router } from "express";

import {
  createCommunity,
  listCommunities,
  joinCommunity,
  leaveCommunity,
} from "../controllers/communityController.js";
import postRouter from "../routes/posts.route.js";

const communityRouter = Router();

// Create a new community
communityRouter.post("/", createCommunity);

// List all communities
communityRouter.get("/", listCommunities);

// Join a community by name
communityRouter.post("/:name/join", joinCommunity);

// Leave a community by name
communityRouter.post("/:name/leave", leaveCommunity);


communityRouter.use("/:name/posts", postRouter);
export default communityRouter;
