import cors from "cors";
import express from "express";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

// ⚠️ Đặt API key của bạn ở đây hoặc qua biến môi trường
const openai = new OpenAI({
  // apiKey: 

});

// API endpoint trung gian
app.post("/api/ask", async (req, res) => {
  try {
    const { message } = req.body;
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error("Lỗi OpenAI:", error);
    res.status(500).json({ error: error.message });
  }
});

// Chạy server
app.listen(3001, () => console.log("✅ Server chạy tại http://localhost:3001"));
