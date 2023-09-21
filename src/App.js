import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
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
      setChatHistory([...chatHistory, { text: questions[currentQuestion], user: "Bot" }]);
      initialBotMessageSent.current = true;
    }
  }, [currentQuestion, chatHistory]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter" && userInput.trim() !== "") {
      const answer = userInput.trim();
      const newMessage = { text: answer, user: "You" };
      setChatHistory([...chatHistory, newMessage]);
      setUserInput("");

      if (currentQuestion < questions.length - 1) {
        setTimeout(() => {
          setCurrentQuestion(currentQuestion + 1);
          setChatHistory([...chatHistory, { text: questions[currentQuestion + 1], user: "Bot" }]);
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
            <div className="Message" key={index}>
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
