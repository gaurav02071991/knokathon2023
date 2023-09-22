const dotenv = require('dotenv');
dotenv.config();

const authToken = process.env.AUTH_TOKEN;
const serviceName = {
    policyManager: "policy-manager",
    fnolService: "fnol-service",
    claimsManager: "claims-manager",
    fnolQuestions: "fnol-questions",
    harmonyData: "harmony-data"
}
const runnerSetup = data => ({
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
    },
    url: `${process.env.REACT_APP_API_URL}`,
    data
});
const prohibited = ['policyNumber'];
const fnol = ["fnol"];

const checker = (value, pattern) =>prohibited.some(element => value.includes(element) || value.match(pattern))
const checkerforfnol = (value, pattern) =>fnol.some(element => value.includes(element) || value.match(pattern))
const getPolicyNumber = function(input){
    const inputString = input;

// Define a regular expression pattern
const pattern = /\d{2}-\d{7}-\d{2}/;

// Use the pattern to search for matches in the input string
const matches = inputString.match(pattern);

// Check if there are any matches and extract the first one
if (matches && matches.length > 0) {
  const extractedPattern = matches[0];
  console.log("Extracted Pattern:", extractedPattern);
  return extractedPattern;
} else {
  console.log("Pattern not found in the input string.");
}
}

const createMessage = function(data){
    return  'Hello '+ data.result.policies[0].policyHolderName + ' with policyNumber as ' + data.result.policies[0].policyNumber+ ' Can we get your damage details?';
}
module.exports = {serviceName, runnerSetup, checker, getPolicyNumber, createMessage, checkerforfnol}