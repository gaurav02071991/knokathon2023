const { NlpManager } = require("node-nlp");

const nlpManager = new NlpManager({ languages: ["en"] });

// Add intents and training data to the NlpManager
nlpManager.addDocument("en", "What is your name?", "get_name");
nlpManager.addAnswer("en", "get_name", "My name is Chatbot.");
// Add more intents and training data as needed

nlpManager.train();