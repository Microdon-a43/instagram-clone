import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    media: { type: Array, required: true },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
    user: { type: mongoose.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Post', postSchema);
