require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  const systemContext = `
You are AI customer support for Pixel Inc website.
Help users with:
- Healing appointment booking
- Website services
- General inquiries

Be polite and concise.
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: systemContext },
              { text: userMessage }
            ]
          }]
        })
      }
    );

    const data = await response.json();

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't answer that.";

    res.json({ reply });

  } catch (err) {
    res.status(500).json({ reply: "Server error." });
  }
});

app.listen(5000, () => console.log("AI server running"));
