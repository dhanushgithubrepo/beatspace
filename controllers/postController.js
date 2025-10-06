import Post from "../models/post.js";
import Community from "../models/Community.js";

// Create a post inside a community
export const createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const { name } = req.params; // community name

    // Find community
    const community = await Community.findOne({ name });
    if (!community) return res.status(404).json({ message: "Community not found" });

    // Check if author is a member
    if (!community.members.includes(author)) {
      return res.status(403).json({ message: "You must join the community to post" });
    }

    // Create post
    const post = await Post.create({
      community: community._id,
      author,
      title,
      content,
    });

    res.status(201).json({ message: "Post created successfully", post });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// List all posts in a community
export const listPosts = async (req, res) => {
  try {
    const { name } = req.params;
    const community = await Community.findOne({ name });
    if (!community) return res.status(404).json({ message: "Community not found" });

    const posts = await Post.find({ community: community._id }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Like/unlike a post
export const likePost = async (req, res) => {
  try {
    const { id } = req.params; // post ID
    const { user } = req.body;

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.likes.includes(user)) {
      post.likes = post.likes.filter(u => u !== user); // unlike
    } else {
      post.likes.push(user); // like
    }

    await post.save();
    res.json({ message: "Post updated successfully", post });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
