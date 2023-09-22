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
module.exports = {serviceName, runnerSetup}