const dotenv = require('dotenv');
dotenv.config();
const moment = require("moment");
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
const lossTypes = ['3RD PARTY VEHICLE HIT PROPERTY', 'FIRE','FLOOD','FREEZE', 'FREEZING ICE AND SNOW', 'HAIL', 'INSURED PARTY VEHICLE HIT PROPERTY', 'LIGHTNING', 'LIGHTNING/POWER SURGE', 'LOSS ASSESSMENT', 'MISC', 'MISC - LOSS ASSESSMENT', 'MISC - STRUCTURAL',  'MOLD', 'POWER FAILURE', 'POWER SURGE', 'SEWER BACKUP', 'SMOKE', 'THEFT/BURGLARY', 'TROPICAL/HURRICANE', 'VANDALISM - BLDG OCCUPIED', 'VANDALISM - BLDG VACANT', 'WATER - EXTERNAL', 'WATER - INTERNAL', 'WIND']

const checker = (value, pattern) =>prohibited.some(element => value.includes(element) || value.match(pattern))
const checkerforfnol = (value) =>fnol.some(element => value.includes(element))
function findMatchingElement(inputString, stringArray) {
    for (const element of stringArray) {
      if (inputString?.toUpperCase().includes(element)) {
        return element;
      }
    }
    return null; // Return null if no match is found
  }
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

function parseDateFromString(dateString) {
    const supportedFormats = [
        "Do MMM YYYY",       // Example: "2nd Oct 2023"
        "MMM Do YYYY",       // Example: "Oct 2nd 2023"
        "YYYY-MM-DD",        // Example: "2023-10-02"
        "YYYY-MM-DDTHH:mm:ss.sssZ", // Example: "2023-10-02T00:00:00.000Z"
        // Add more supported date formats as needed
      ];
  
    for (const format of supportedFormats) {
      const parsedDate = moment(dateString, format, true);
      if (parsedDate.isValid()) {
        return parsedDate.toISOString(); // Return ISO string format if valid
      }
    }
  
    return null; // Invalid date for all supported formats
  }

const mandatoryanswers = [
    
]  
  
  
module.exports = {serviceName, runnerSetup, checker, getPolicyNumber, createMessage, checkerforfnol,lossTypes,parseDateFromString}