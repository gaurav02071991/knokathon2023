import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import {questions} from './helpers';

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState("");

  const initialBotMessageSent = useRef(false);
  let [currentQuestion, setCurrentQuestion] = useState(0);
  // const [policyData, setPolicyData] = useState(null);
  // const dummyPolicyData = {
  //   policyNumber: "12345",
  //   phoneNumber: "555-555-5555",
  // };
  

  useEffect(() => {
    if (!initialBotMessageSent.current) {
      addMessageToHistory(questions[currentQuestion].question, "Bot");
      initialBotMessageSent.current = true;
    }
  }, [currentQuestion]);

  const addMessageToHistory = (message, user) => {
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { text: message, user },
    ]);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleKeyUp = async (e) => {
    if (e.key === "Enter" && userInput.trim() !== "") {
      const answer = userInput.trim();
      addMessageToHistory(answer, "You");
      setUserInput("");

      if (currentQuestion === 0) {
        // Simulate bot thinking time
        addMessageToHistory("Bot is processing your request...", "Bot");

        try {
          // Replace with your API endpoint to fetch policy data
          const apiUrl = 'http://localhost:3001/searchPolicy'; // Replace with your actual API URL
          const queryParams = { question: questions[currentQuestion].question, answer };
          const queryString = new URLSearchParams(queryParams).toString();
  
          const response = await fetch(`${apiUrl}?${queryString}`);
          if (response.status===200) {
            const data = await response.json();
            const botResponse = data.result.policies[0].policyNumber + ' has been found with policy holder as ' + data.result.policies[0].policyHolderName; // Adjust the response parsing as needed
            addMessageToHistory(botResponse, "Bot");
          } else {
            addMessageToHistory("Bot: Sorry, I couldn't fetch the policy data.", "Bot");
          }
        } catch (error) {
          console.error(error);
          addMessageToHistory("Bot: Sorry, an error occurred while fetching the policy data.", "Bot");
        }
      } else if (currentQuestion < questions.length - 1) {
        // Continue with the rest of the questions
        setCurrentQuestion(currentQuestion + 1);
        addMessageToHistory(questions[++currentQuestion].question, "Bot");
      } else {
        // No more questions, end the conversation
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
