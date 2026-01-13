import "dotenv/config";

const config = {
  name: process.env.NAME || "MYTHOS GPT",
  version: process.env.VERSION || "1.0",
  port: process.env.PORT || "3000",
  mongoDBurl: process.env.MONGODB_URL || "",
  openAi: {
    apiKey: process.env.OPENAI_API_KEY || "",
  },
};

export default config;
