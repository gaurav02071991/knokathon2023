const express = require("express");
const axios = require('axios');
const dotenv = require('dotenv');
const { serviceName, runnerSetup,checker, getPolicyNumber } = require('./helpers');
const cors=require('cors');
dotenv.config();
const app = express();
const port = 5000;

const {manager} = require('./nlpManager');

// Define a simple intent and response

app.use(express.json());
app.use(cors());
app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;
  if(checker(userMessage)){
    const answer = getPolicyNumber(userMessage);
    const axiosConfig = runnerSetup({
      service: serviceName.fnolService,
      method: 'GET',
      path:  `v1/policies?policyNumber=${answer}`
  });
  const response = await axios(axiosConfig);
  res.json({message: 'Hello '+ response.data.result.policies[0].policyHolderName + ' with policyNumber as ' + response.data.result.policies[0].policyNumber});
  }else{
 // Process user's message using node-nlp
 const response = await manager.process("en", userMessage);

 // Get the best answer from the response
 const answer = response.score > 0.5 ? response.answer : "I'm not sure.";
 res.json({ message: answer });
  }

 
  
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
