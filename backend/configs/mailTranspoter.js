var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'docadvisormail@gmail.com',
           pass: 'nswgmrhqcmxgwrsf'
       }
   });

module.exports = transporter;