import Message from '../models/message.js';
import Conversation from '../models/conversation.js';

class APIfeatures {
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

export const messageCtrl = {
  create: async (req, res) => {
    try {
      const { sender, recipient, text, media } = req.body;

      if (!recipient || !text.trim()) return;

      const newConversation = await Conversation.findOneAndUpdate(
        {
          $or: [
            { members: [sender, recipient] },
            { members: [recipient, sender] }
          ]
        },
        {
          members: [sender, recipient],
          text,
          media
        },
        { new: true, upsert: true }
      ).populate('members', 'avatar username fullname');
      const newMessage = await Message.create({
        conversationId: newConversation._id,
        sender,
        recipient,
        text,
        media
      });
      res.json({
        msg: 'Create Success!',
        newMessage,
        newConversation
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getConversations: async (req, res) => {
    try {
      const conversations = await Conversation.find({
        members: req.user._id
      })
        .sort('-updatedAt')
        .populate('members', 'avatar username fullname');
      res.json(conversations);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getMsg: async (req, res) => {
    try {
      const messages = await Message.find({
        conversationId: req.params.id
      }).populate('sender', 'username fullname avatar');

      // const features = new APIfeatures(
      //   Conversation.find({
      //     $or: [
      //       { sender: req.user._id, recipient: req.params.id },
      //       { sender: req.params.id, recipient: req.user._id }
      //     ]
      //   }),
      //   req.query
      // ).paginating();

      // const messages = await features.query.sort('-createdAt');
      // console.log(messages);

      res.json(messages);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
};

// create: async (req, res) => {
//   try {
//     const newMessage = await Message.create(req.body);
//     res
//       .status(200)
//       .json({ message: 'Сообщение успешно создано', newMessage });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// },
// getMsg: async (req, res) => {
//   try {
//     const messages = await Message.find({ conversationId: req.params.id });
//     res.status(200).json(messages);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// }
