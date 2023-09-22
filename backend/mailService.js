
const mandrill = require('mandrill-api/mandrill');
const mandrillClient = new mandrill.Mandrill(process.env.MANDRILL_API_KEY);

const createMail = function(msg){
    return new Promise((resolve, reject) => {
        mandrillClient.messages.send({
            message: msg,
            async: false,
            ip_pool: 'Main Pool'
        }, (result) => {
            console.log(result);
            resolve(true);
        }, (err) => {
            console.log(err);
            this.logger.warn('Error occured sending mail', { errorData: err });
             resolve(true); // force success response for demo
        });
    });
}


module.exports = { createMail }
            