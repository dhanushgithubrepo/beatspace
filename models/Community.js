import mongoose from "mongoose";

const CommunitySchema = new mongoose.Schema({  // ✅ Schema, not CommunitySchema
    name: { type: String, required: true, unique: true },
    description: { type: String },
    creator: { type: String, required: true }, // Later: ObjectId reference
    members: { type: [String], default: [] },  // Later: array of user IDs
}, { timestamps: true });

export default mongoose.model("Community", CommunitySchema);
