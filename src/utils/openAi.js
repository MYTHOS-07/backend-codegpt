import config from "../config/config.js";

const getOpenAIApiResponse = async (message) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.openAi.apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API Error: ${response.status} ${errorText}`);
    }

    const data = await response.json();

    const aiContent = data?.choices?.[0]?.message?.content ?? null;

    if (!aiContent) {
      throw new Error("No valid AI response content received");
    }

    return aiContent;
  } catch (err) {
    console.error("Error calling OpenAI API:", err.message);
    return null; //prevents mongoose crash
  }
};

export default getOpenAIApiResponse;
