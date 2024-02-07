import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
  {
    members: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    text: String,
    media: Array
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Conversation', conversationSchema);
