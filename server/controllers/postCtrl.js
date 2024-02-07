import Post from '../models/post.js';
import User from '../models/user.js';

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

export const create = async (req, res) => {
  try {
    const { content, media } = req.body;

    if (media.length <= 0)
      return res.status(400).json({ message: 'Добавьте фото' });

    const newPost = await Post.create({ content, media, user: req.user._id });

    res.status(200).json({
      message: 'Пост создан успешно',
      newPost: {
        ...newPost._doc,
        user: req.user
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании поста' });
  }
};
export const getPosts = async (req, res) => {
  try {
    const features = new APIFeatures(
      Post.find({
        user: [...req.user.following, req.user._id]
      }),
      req.query
    );
    const posts = await features.query
      .sort('-createdAt')
      .populate('user likes', 'avatar username fullname followers')
      .populate({
        path: 'comments',
        populate: { path: 'user likes', select: '-password' }
      });
    res.status(200).json({ message: 'Success', result: posts.length, posts });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user._id }).sort('-createdAt');

    if (!posts) res.status(404).json({ message: 'Постов нет' });

    res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: { likes: req.user._id }
      },
      { new: true }
    ).populate('likes');

    await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { favourite: post._id }
      },
      { new: true }
    ).populate('favourite');
    res.status(200).json({ message: 'Success' });
  } catch (error) {
    res.status(500).json({ message: 'Произошла неизвестная ошибка' });
  }
};

export const unlikePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likes: req.user._id }
      },
      { new: true }
    ).populate('likes');

    await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { favourite: req.params.id }
      },
      { new: true }
    ).populate('favourite');

    res.status(200).json({ message: 'Success' });
  } catch (error) {
    res.status(500).json({ message: 'Произошла неизвестная ошибка' });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, {
      content: req.body.content,
      media: req.body.media
    });
    res.status(200).json({ message: 'Пост успешно обновлен' });
  } catch (error) {
    res.status(500).json({ message: 'Произошла неизвестная ошибка' });
  }
};
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.user._id.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: 'У вас нет прав на удаление чужих постов!' });
    }

    await Post.deleteOne({ _id: post._id });
    res.status(200).json({ message: 'Post was deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Произошла неизвестная ошибка' });
  }
};
