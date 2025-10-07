import Community from "../models/Community.js";

// ✅ Create a new community
export const createCommunity = async (req, res) => {
  try {
    const { name, description, creator } = req.body;

    const existing = await Community.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Community name already taken" });
    }

    const community = await Community.create({
      name,
      description,
      creator,
      members: [creator],
    });

    res.status(201).json({
      message: "Community created successfully",
      community,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ List all communities
export const listCommunities = async (req, res) => {
  try {
    const communities = await Community.find();
    res.json(communities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get community by name (for viewing posts page)
export const getCommunityByName = async (req, res) => {
  try {
    const community = await Community.findOne({ name: req.params.name });
    if (!community)
      return res.status(404).json({ message: "Community not found" });

    res.json(community);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Join a community
export const joinCommunity = async (req, res) => {
  try {
    const { user } = req.body;
    const community = await Community.findOne({ name: req.params.name });

    if (!community)
      return res.status(404).json({ error: "Community not found" });
    if (community.members.includes(user))
      return res.status(400).json({ message: "User already a member" });

    community.members.push(user);
    await community.save();

    res.status(200).json({
      message: "User successfully joined the community",
      community,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Leave a community
export const leaveCommunity = async (req, res) => {
  try {
    const { user } = req.body;
    const community = await Community.findOne({ name: req.params.name });

    if (!community)
      return res.status(404).json({ error: "Community not found" });
    if (!community.members.includes(user))
      return res.status(400).json({ message: "User is not a member" });

    community.members = community.members.filter((u) => u !== user);
    await community.save();

    res.status(200).json({
      message: "User successfully left the community",
      community,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
