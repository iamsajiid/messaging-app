import { StatusCodes } from "http-status-codes";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import { NotFoundError } from "../errors/index.js";

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: recieverID } = req.params;
    const { _id: senderID } = req.user;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderID, recieverID] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderID, recieverID],
      });
    }
    const newMessage = new Message({
      senderID,
      recieverID,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]);
    res.status(StatusCodes.OK).json(newMessage);
  } catch (error) {
    // throw new CustomError("Internal Server Error");
    res.json({ msg: error });
  }
};

const getMessages = async (req, res) => {
  const { id: recieverID } = req.params;
  const { _id: senderID } = req.user;
  try {
    const conversation = await Conversation.findOne({
      participants: { $all: [senderID, recieverID] },
    }).populate("messages");
    if (!conversation) {
      throw new NotFoundError("chat not found");
    }
    const messages = conversation.messages;
    res.json({ chat: messages });
  } catch (error) {
    res.json({ msg: error });
  }
};

export { sendMessage, getMessages };
