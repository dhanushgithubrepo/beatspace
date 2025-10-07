import Post from "../models/post.js";
import Community from "../models/Community.js";

// ✅ Create a post inside a community
export const createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const { name } = req.params; // community name

    const community = await Community.findOne({ name });
    if (!community) return res.status(404).json({ message: "Community not found" });

    if (!community.members.includes(author)) {
      return res.status(403).json({ message: "You must join the community to post" });
    }

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

// ✅ Get posts for a specific community
export const getPostsByCommunity = async (req, res) => {
  try {
    const { name } = req.params; // community name from nested route
    const community = await Community.findOne({ name });
    if (!community) return res.status(404).json({ message: "Community not found" });

    const posts = await Post.find({ community: community._id })
      .sort({ createdAt: -1 }); // latest first

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

// ✅ Like/unlike a post
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
