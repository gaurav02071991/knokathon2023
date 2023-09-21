import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const questions = [
    "What is your name?",
    "Where are you from?",
    "What is your favorite color?",
    "What do you like to do in your free time?",
  ];

  const initialBotMessageSent = useRef(false);

  useEffect(() => {
    if (currentQuestion === 0 && !initialBotMessageSent.current) {
      addMessageToHistory(questions[currentQuestion], "Bot");
      initialBotMessageSent.current = true;
    }
  }, []);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const addMessageToHistory = (message, user) => {
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { text: message, user },
    ]);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter" && userInput.trim() !== "") {
      const answer = userInput.trim();
      addMessageToHistory(answer, "You");
      setUserInput("");

      if (currentQuestion < questions.length - 1) {
        setTimeout(() => {
          setCurrentQuestion(currentQuestion + 1);
          addMessageToHistory(questions[currentQuestion], "Bot");
        }, 1000); // Delay to simulate bot response
      } else {
        setCurrentQuestion(-1);
      }
    }
  };

  return (
    <div className="App">
      <div className="Chat">
        <div className="MessageList">
          {chatHistory.map((message, index) => (
            <div
              className={`Message ${message.user === "Bot" ? "BotMessage" : "UserMessage"}`}
              key={index}
            >
              <strong>{message.user}:</strong> {message.text}
            </div>
          ))}
        </div>
        {currentQuestion >= 0 ? (
          <div className="MessageForm">
            <input
              type="text"
              placeholder="Type your answer..."
              value={userInput}
              onChange={handleInputChange}
              onKeyUp={handleKeyUp}
            />
          </div>
        ) : (
          <div className="MessageForm">
            <p>Chatbot: Thank you for answering the questions!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
