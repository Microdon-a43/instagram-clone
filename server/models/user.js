import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'USER' },
    followers: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    story: { type: String, default: '' },
    mobile: { type: String, default: '' },
    avatar: { type: String, default: '' },
    gender: { type: String, default: '' },
    website: { type: String, default: '' },
    favourite: [{ type: mongoose.Types.ObjectId, ref: 'Post' }]
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
