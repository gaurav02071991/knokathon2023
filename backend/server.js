const express = require("express");
const cors=require('cors');
const app = express();
const port = 5000;

const {manager} = require('./nlpManager');

// Define a simple intent and response

app.use(express.json());
app.use(cors());
app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;

  // Process user's message using node-nlp
  const response = await manager.process("en", userMessage);

  // Get the best answer from the response
  const answer = response.score > 0.5 ? response.answer : "I'm not sure.";
  res.json({ message: answer });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
