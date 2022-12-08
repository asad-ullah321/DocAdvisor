//const { body, validationResult } = require("express-validator");
//const connection = require('../configs/db');
const fs = require("fs");
const transporter = require("../configs/mailTranspoter");
const Patient = require("../models/pateint");
const VerCode = require("../models/verCodePat");
const sequelize = require("../configs/db");
const jwt = require("jsonwebtoken");

const signUp = (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).JSON({ error: "no file attached" });
    }
    //const verCode = generateCode();

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

        sequelize
          .sync()
          .then(() => {
            console.log("Table created successfully!"); //saving doc data
            Patient.create({
              name: formData.name,
              email: formData.email,
              city: formData.city,
              phoneNumber: formData.phoneNumber,
              password: formData.password,
              filename: formData.filename,
            })
              .then(() => {
                // console.log(res);
                console.log("data of Pateint  saved");
             
                const verCode = generateCode(); //saving verCode
                VerCode.create({
                  Code: verCode,
                  email: formData.email,
                  status: false
                })
                  .then(() => {
                    //sending mail
                    // console.log(res);
                    console.log("verfication code saved");
                    res.render(
                      "verificationmail",
                      { code: verCode },
                      function (err, html) {
                        const mailOptions = {
                          from: "docadvisormail@gmail.com", // sender address
                          to: req.body.email, // list of receivers
                          subject: `Welcome to DocAdvisor`, // Subject line
                          html: html,
                        };

                        transporter.sendMail(mailOptions, function (err, info) {
                          if (err) {
                            console.log("nodemailer error" + err);
                            res.status(500).json({ error: err });
                          } 
                          else 
                          {console.log(info)

                          const token = jwt.sign(
                            { email: req.body.email },
                            "20F-1033"
                          ); //, { algorithm: 'RS256' })//, function(err, token) {
                          console.log("token: " + token);
                          //if(err)
                          //console.log(err);
                          //res when all goes well
                          res.status(200).json({
                            nextroute: "/verification",
                            email: req.body.email,
                            authToken: token,
                          });
                          //  });
                        }
                        });
                      }
                    );
                  })
                  .catch((err) => {
                    console.log("error at insetion of vercode" + err);
                    res.status(500).json({ error: err });
                  });
              })
              .catch((err) => {
                console.log("error at data insert" + err);
                res.status(500).json({ error: err });
              });
          })
          .catch((error) => {
            console.error("Unable to create table : ", error);
            res.status(500).json({ error: err });
          });

        /*----<code to send verifcation email to user>---*/

        /* res.render("verificationmail", { code: verCode }, function (err, html) {
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
        });*/

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

const Verify = (req, res) => {
  //const code = req.body.code;
  //const token = req.header("auth-token");
  // const data = jwt.verify(token, "20F-1033");
  //console.log("code" + code + req.header("auth-token"));
  //res.status(200).json({ verifybit: 1, nextroute: "/" });
  //res.status(200).json({ verifybit: 1, nextroute: "/" });

  /* verify code using webtoken or session for account and code send by user from frontend */
  if (req.header("auth-token")) {
    const code = parseInt(req.body.code, 10);
    const token = req.header("auth-token");
    const data = jwt.verify(token, "20F-1033");
    console.log("code" + code + typeof code +req.header("auth-token"));

    sequelize
      .sync()
      .then(() => {
        VerCode.findOne({
          where: {
            email: data.email,
          },
        })
          .then((data) => {
            console.log("data:  ");
            console.log(typeof data.dataValues.Code); //.verifcationCode.dataValues.Code);
            //res.status(200).json({ verifybit: 1, nextroute: "/" });

            if (data.dataValues.Code === code) {
              VerCode.update(
                { status: true },
                { where: { email: data.email } }
              )
                .then((data) => {
              res.status(200).json({ verifybit: 1, nextroute: "/signin/pateint" });
                });
            }
            else{
              res.status(200).json({ verifybit: 0, nextroute: "/verification" });
            }
          })
          .catch((error) => {
            console.error("Failed to retrieve data : ", error);
          });
      })
      .catch((error) => {
        console.error("Unable to create table : ", error);
      });
  } else {
    res.status(200).json({
      nextroute: "/signUp",
      //email: req.session.email,
    });
  }
};

module.exports = { signUp, Verify };
