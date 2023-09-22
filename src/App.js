import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const questions = [
    "Welcome to FNOL, may I know your phone number or policy number?",
    "Where are you from?",
    "What is your favorite color?",
    "What do you like to do in your free time?",
  ];

  const initialBotMessageSent = useRef(false);
  let [currentQuestion, setCurrentQuestion] = useState(0);
  const [policyData, setPolicyData] = useState(null);
  const dummyPolicyData = {
    policyNumber: "12345",
    phoneNumber: "555-555-5555",
  };
  

  useEffect(() => {
    if (!initialBotMessageSent.current) {
      addMessageToHistory(questions[currentQuestion], "Bot");
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
          const apiUrl = 'https://api.harmony-ins.com/chat'; // Replace with your actual API URL
          const response = await fetch(apiUrl);
          
          if (true) {
            const policyDataResponse = await response.json(); // Parse the API response
            setPolicyData(policyDataResponse); // Store policy data in state

            // Proceed to the next question
            setTimeout(() => {
              setCurrentQuestion(currentQuestion + 1);
              addMessageToHistory(questions[++currentQuestion], "Bot");
            }, 1000); // Delay to simulate bot response
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
        addMessageToHistory(questions[++currentQuestion], "Bot");
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
