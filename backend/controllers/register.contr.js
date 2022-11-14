//const { body, validationResult } = require("express-validator");
//const connection = require('../configs/db');
const fs = require("fs");
const transporter = require("../configs/mailTranspoter");

const signUp = (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).JSON({ error: "no file attached" });
    }

    //new name of file with its type
    let filetype = req.file.mimetype.split("/")[1];
    let newFileName = `${req.file.filename}.${req.body.email}.${filetype}`;

    //making object of DATA
    const formData = {
      name: req.body.name,
      email: req.body.email,
      city: req.body.city,
      qualification: req.body.qualification,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      filename: newFileName,
    };
    //renaming file
    fs.rename(
      `./assets/${req.file.filename}`,
      `./assets/${newFileName}`,
      () => {
        //console.log(formData);
        /* callback is called after renaming file*/
        /* now we first save the whole data  on database then -> genreate a code and save it to database also in different table then ->in callback send mail */
        const verCode = generateCode();



        /*----<code to send verifcation email to user>---*/
       
        res.render("verificationmail", { code: verCode }, function (err, html) {
          const mailOptions = {
            from: "docadvisormail@gmail.com", // sender address
            to: req.body.email, // list of receivers
            subject: `Welcome to DocAdvisor`, // Subject line
            html: html,
          };

          transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
              console.log(err);
              res.status(500).json({ error: err });
            } else console.log(info);


            res.status(200).json({ nextroute: "/signin" });
          });
        });





        /*send this response in last call back*/
       // res.status(200).json({ nextroute: "/signin" });
      }
    );
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

function generateCode() {
  var min = 100000;
  var max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = { signUp };
