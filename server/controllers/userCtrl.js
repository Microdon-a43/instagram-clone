import User from '../models/user.js';

export const userCtrl = {
  searchUser: async (req, res) => {
    try {
      const users = await User.find({
        username: { $regex: req.query.username }
      })
        .limit(10)
        .select('fullname username avatar');

      res.json({ users });
    } catch (error) {
      console.log(error);
    }
  },
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
        .select('-password')
        .populate('followers following', '-password');

      res.json({ user });
    } catch (error) {
      console.log(error);
    }
  },
  updateUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.body._id, {
        fullname: req.body.fullname,
        mobile: req.body.mobile,
        story: req.body.story,
        website: req.body.website,
        avatar: req.body.avatar
      });

      if (!user)
        return res
          .status(400)
          .json({ message: 'Произошла ошибка при выполнении запроса' });

      res.status(200).json({ user });
    } catch (error) {
      console.log(error);
    }
  },
  follow: async (req, res) => {
    try {
      const user = await User.find({
        _id: req.params.id,
        followers: req.user._id
      });
      if (user.length > 0)
        return res.status(500).json({ message: 'You followed this user' });

      const newUser = await User.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $push: { followers: req.user._id }
        },
        {
          new: true
        }
      ).populate('followers following', '-password');

      await User.findByIdAndUpdate(
        { _id: req.user._id },
        {
          $push: { following: req.params.id }
        },
        { new: true }
      );

      res.json({ newUser });
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },
  unfollow: async (req, res) => {
    try {
      const newUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { followers: req.user._id }
        },
        { new: true }
      ).populate('followers following', '-password');

      await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $pull: { following: req.params.id }
        },
        { new: true }
      );

      res.json({ newUser });
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  }
};
