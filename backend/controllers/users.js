import Conversation from "../models/Conversation.js";

function flattenArray(arr) {
  return arr.reduce((acc, curr) => {
    if (Array.isArray(curr)) {
      return acc.concat(flattenArray(curr));
    }
    return acc.concat(curr);
  }, []);
}

const getUsersMessaged = async (req, res) => {
  const { _id: senderID } = req.user;
  try {
    const conversations = await Conversation.find({
      participants: senderID,
    }).select("-password");
    let chattedWith = conversations.map((obj) => {
      return obj.participants.filter(
        (id) => id.toString() !== senderID.toString()
      );
    });
    const flattenedChats = flattenArray(chattedWith);
    res.json({ conversations, chattedWith, flattenedChats });
  } catch (error) {
    res.json({ msg: error });
  }
};

export { getUsersMessaged };
