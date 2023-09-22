const express = require("express");
const axios = require('axios');
const dotenv = require('dotenv');
const { serviceName, runnerSetup, checker, getPolicyNumber, createMessage, checkerforfnol, parseDateFromString } = require('./helpers');
const cors=require('cors');
const pkg2 = require('./db.js');
const { ready, db2 } = pkg2;
let db = {}
ready.then(()=>{
     db = db2.connections[0].db;
})
const details = Object.freeze({

})
let apiResponses = new Set();
dotenv.config();
const app = express();
const port = 5000;
 
const {manager} = require('./nlpManager');

// Define a simple intent and response
  
app.use(express.json());
app.use(cors());
app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;
  const date = parseDateFromString(userMessage);
  if(date){
    const response = await manager.process("en", 'loss as per date');
    apiResponses.add({question:'LossDate', answer: date})
    const answer = response.score > 0.5 ? response.answer + date.split('T')[0] : "I'm not sure.";
    return res.json({ message: answer });
  }
  const pattern = /\d{2}-\d{7}-\d{2}/;
  if(checkerforfnol(userMessage)){
    const data = await db.collection('quickfnol').insertOne({fnolNumber:"1234"});
    return true;
  }
  else if(checker(userMessage, pattern)){
    const answer = getPolicyNumber(userMessage);
    const axiosConfig = runnerSetup({
      service: serviceName.fnolService,
      method: 'GET',
      path:  `v1/policies?policyNumber=${answer}`
  });
  const response = await axios(axiosConfig);
  apiResponses.add({question:userMessage, answer: response.data})
  res.json({message: createMessage(response.data)});
  }else{
 // Process user's message using node-nlp
 const response = await manager.process("en", userMessage);
 if(userMessage.includes('No')){
    const arrayFromSet = [...apiResponses];
    arrayFromSet.pop();
    apiResponses = new Set(arrayFromSet);
 }
 apiResponses.add({question:userMessage, answer: response.answer})
 // Get the best answer from the response
 const answer = response.score > 0.5 ? response.answer : "I'm not sure.";
 res.json({ message: answer });
  }

 
  
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
