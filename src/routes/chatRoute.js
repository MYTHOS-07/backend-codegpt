import express from "express";
import chatController from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/test", chatController.apiTest);

router.post("/chat", chatController.createChat);

router.get("/thread", chatController.getAllChats);

router.get("/thread/:threadId", chatController.getChatByID);

router.delete("/thread/:threadId", chatController.deleteChat);

export default router;
