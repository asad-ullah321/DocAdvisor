var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'docadvisormail@gmail.com',
           pass: 'wfjqvftdofsamysf'
       }
   });

module.exports = transporter;