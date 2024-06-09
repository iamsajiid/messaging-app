import Conversation from "../models/Conversation.js";
import User from "../models/User.js";

const getUsersMessaged = async (req, res) => {
  const { _id: senderID } = req.user;
  try {
    const conversations = await Conversation.find({
      participants: senderID,
    });

    let chattedWith = conversations.map((obj) => {
      return obj.participants.filter(
        (id) => id.toString() !== senderID.toString()
      );
    });

    const flattenedChats = chattedWith.flat();

    const chatInfos = await Promise.all(
      flattenedChats.map((id) => User.findById(id).select("-password"))
    );

    res.json(chatInfos);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export { getUsersMessaged };
