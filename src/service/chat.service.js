import Thread from "../models/Thread.js";
import getOpenAIApiResponse from "../utils/openAi.js";

const apiTest = async (data) => {
  try {
    if (!data || Object.keys(data).length === 0) {
      const error = new Error("Data cannot be empty");
      error.status = 400;
      throw error;
    }

    const thread = new Thread({ data });

    const response = await thread.save();

    return response;
  } catch (error) {
    if (error.name === "ValidationError") {
      error.status = 400;
    }
    throw error;
  }
};

const createChat = async (threadId, message) => {
  if (!threadId || !message) {
    throw new Error("Missing required fields");
  }

  let thread = await Thread.findOne({ threadId });

  if (!thread) {
    thread = new Thread({
      threadId,
      title: message,
      messages: [{ role: "user", content: message }],
    });
  } else {
    thread.messages.push({ role: "user", content: message });
  }

  const assistantReply = await getOpenAIApiResponse(message);

  thread.messages.push({ role: "assistant", content: assistantReply });
  thread.updatedAt = new Date();

  await thread.save();
  return assistantReply;
};

const getAllChats = async () => {
  const threads = await Thread.find({}).sort({ updatedAt: -1 });

  return threads;
};

const getChatByID = async (threadId) => {
  const threads = await Thread.findOne({ threadId });

  console.log(threads.messages);

  return threads.messages;
};

const deleteChat = async (threadId) => {
  if (!threadId) {
    throw new Error("Thread ID is required");
  }

  const deletedThread = await Thread.findOneAndDelete({ threadId });

  return deletedThread;
};

export default {
  apiTest,
  createChat,
  getAllChats,
  getChatByID,
  deleteChat,
};
