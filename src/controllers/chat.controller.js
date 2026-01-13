import chatService from "../service/chat.service.js";

const apiTest = async (req, res) => {
  try {
    const data = req.body;

    if (!data) {
      return res.status(400).json({
        success: false,
        message: "Request body is required",
      });
    }

    const result = await chatService.apiTest(data);

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error in apiTest controller:", error);
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

const createChat = async (req, res) => {
  const { threadId, message } = req.body;

  console.log(threadId, message);

  try {
    const thread = await chatService.createChat(threadId, message);
    res.status(200).json({ reply: thread });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getAllChats = async (req, res) => {
  try {
    const threads = await chatService.getAllChats();

    return res.status(200).json(threads);
  } catch (error) {
    res.status(error.status || 500);
  }
};

const getChatByID = async (req, res) => {
  try {
    const { threadId } = req.params;

    console.log(threadId);

    const thread = await chatService.getChatByID(threadId);

    console.log("i am here");

    if (!thread) {
      return res.status(404).json({ error: "Thread not Found" });
    }

    return res.status(200).json(thread);
  } catch (error) {
    res.status(error.status || 500);
  }
};

const deleteChat = async (req, res) => {
  const { threadId } = req.params;

  try {
    const deletedThread = await chatService.deleteChat(threadId);

    if (!deletedThread) {
      return res.status(404).json({ error: "Thread not found" });
    }

    return res.status(200).json({
      message: "Thread deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete thread" });
  }
};

export default { apiTest, createChat, getAllChats, getChatByID, deleteChat };
