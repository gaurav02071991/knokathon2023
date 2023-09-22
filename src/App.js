import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [userMessage, setUserMessage] = useState("");
  const [botMessages, setBotMessages] = useState([]);
  const [conversationHistory, setConversationHistory] = useState([]);

  const sendMessage = async () => {
    if (userMessage.trim() !== "") {
      try {
        // Make an API request to the backend
        const response = await axios.post("http://localhost:5000/api/chat", { message: userMessage });

        // Update the conversation history
        const updatedHistory = [
          ...conversationHistory,
          { role: "user", text: userMessage },
          { role: "bot", text: response.data.message },
        ];
        setConversationHistory(updatedHistory);

        // Update the bot's response
        setBotMessages([...botMessages, response.data.message]);
      } catch (error) {
        console.error("Error sending message:", error);
        setBotMessages([...botMessages, "An error occurred."]);
      }

      // Clear the user input
      setUserMessage("");
    }
  };

  return (
    <div className="App">
      <h1>ChatBot</h1>
      <div className="chat-container">
        {conversationHistory.map((message, index) => (
          <div
            key={index}
            className={`message ${message.role === "bot" ? "bot" : "user"}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message..."
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
