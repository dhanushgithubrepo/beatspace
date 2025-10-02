import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  community: { type: mongoose.Schema.Types.ObjectId, ref: "Community", required: true },
  author: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  likes: { type: [String], default: [] }, // array of usernames who liked
}, { timestamps: true });

const Post = mongoose.model("Post", PostSchema);
export default Post;
