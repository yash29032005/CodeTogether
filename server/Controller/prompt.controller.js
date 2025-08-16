const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);

exports.getReply = async (req, res) => {
  try {
    const { userPrompt } = req.body;

    // Get the model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Correct format: contents is an array, each with parts array containing text
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: userPrompt }],
        },
      ],
    });

    // Extract the text
    const fullText =
      result.response.candidates[0]?.content?.parts[0]?.text || "";

    res.json({ result: fullText });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message });
  }
};
