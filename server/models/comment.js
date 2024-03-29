import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    tag: Object,
    reply: mongoose.Types.ObjectId,
    likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    postId: mongoose.Types.ObjectId,
    postUserId: mongoose.Types.ObjectId
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Comment', commentSchema);
