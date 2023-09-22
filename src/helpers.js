const questions = [{
    question : "Welcome to FNOL, may I know your phone number or policy number?",
    searchPolicy: {
        url: 'searchPolicy',
        successmessage: function messageCreate(data) {
            return data.result.policies[0].policyNumber + ' has been found with policy holder as ' + data.result.policies[0].policyHolderName;
        },
        failedmessage: function messageCreate(data) {
            return 'Sorry not able to process'
        }

    }
}]
// const questions = [
//     "Welcome to FNOL, may I know your phone number or policy number?",
//     "Where are you from?",
//     "What is your favorite color?",
//     "What do you like to do in your free time?",
//   ]


module.exports = {questions}