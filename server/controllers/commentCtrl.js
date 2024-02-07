import Comment from '../models/comment.js';
import Post from '../models/post.js';

export const commentCtrl = {
  createComment: async (req, res) => {
    try {
      const { postId, content, reply, postUserId } = req.body;

      console.log(req.body);
      const post = await Post.findById(postId);
      if (!post) return res.status(400).json({ message: 'Пост не найден!' });

      if (reply) {
        const comment = await Comment.findById(reply);
        if (!comment)
          return res.status(400).json({ message: 'Комментарий был удален!' });
      }

      const newComment = await Comment.create({
        user: req.user._id,
        content,
        postUserId,
        reply,
        postId
      });

      await Post.findByIdAndUpdate(
        { _id: post._id },
        {
          $push: { comments: newComment._id }
        },
        { new: true }
      );

      res.status(200).json({
        newComment: {
          ...newComment._doc,
          user: req.user
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Произошла непредвиденная ошибка' });
    }
  },

  likeComment: async (req, res) => {
    try {
      const comment = await Comment.find({
        _id: req.params.id,
        likes: req.user._id
      });

      if (comment.length > 0)
        return res.status(400).json({ msg: 'You already liked this post.' });

      await Comment.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $push: { likes: req.user._id }
        }
      );
      res.status(200).json({ message: 'You liked comment' });
    } catch (error) {
      res.status(500).json({ message: 'Произошла непредвиденная ошибка' });
    }
  },
  unlikeComment: async (req, res) => {
    try {
      const comment = await Comment.find({
        _id: req.params.id,
        likes: req.user._id
      });

      if (comment.length < 0)
        return res
          .status(400)
          .json({ message: 'You didn"t like tihs comment yet' });

      await Comment.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $pull: { likes: req.user._id }
        }
      );

      res.status(200).json({ message: 'You unliked comment' });
    } catch (error) {
      res.status(500).json({ message: 'Произошла непредвиденная ошибка' });
    }
  },
  deleteComment: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);

      if (String(comment.user) !== String(req.user._id)) {
        return res
          .status(401)
          .json({ message: 'Вы не можете удалять чужие комментарии!' });
      }

      await Comment.deleteOne({ _id: comment._id });

      res.status(200).json({ message: 'Success' });
    } catch (error) {
      res.status(500).json({ message: 'Произошла непредвиденная ошибка' });
    }
  },
  updateComment: async (req, res) => {
    try {
      const { text } = req.body;
      const updatedComment = await Comment.findByIdAndUpdate(req.params.id, {
        text
      });

      res
        .status(200)
        .json({ message: 'Комментарий был успещно обновлен', updatedComment });
    } catch (error) {
      res.status(500).json({ message: 'Произошла непредвиденная ошибка' });
    }
  }
};
