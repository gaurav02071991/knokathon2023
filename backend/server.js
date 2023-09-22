const express = require("express");
const axios = require('axios');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { serviceName, runnerSetup, checker, getPolicyNumber, createMessage, checkerforfnol } = require('./helpers');
const cors=require('cors');
const pkg2 = require('./db.js');
const { ready, db2 } = pkg2;
let db = {}
ready.then(()=>{
     db = db2.connections[0].db;
})

dotenv.config();
const app = express();
const port = 5000;
 
const {manager} = require('./nlpManager');

// Define a simple intent and response
  
app.use(express.json());
app.use(cors());
app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;
  const pattern = /\d{2}-\d{7}-\d{2}/;
  if(checkerforfnol(userMessage, pattern)){
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
  res.json({message: createMessage(response.data)});
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
