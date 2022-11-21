const Doctor = require("../models/doctor");
const RecCode = require("../models/recoveryCode");
const sequelize = require("../configs/db");
const jwt = require("jsonwebtoken");
const transporter = require("../configs/mailTranspoter");

//v1
const sendRecoveryCode = (req, res) => {
  sequelize
    .sync()
    .then(() => {
      Doctor.findOne({
        where: {
          email: req.body.email,
        },
      })
        .then((data) => {
          console.log("data:  ");

          if (data) {
            const recCode = generateCode(); //saving verCode
            RecCode.create({
              Code: recCode,
              email: req.body.email,
            })
              .then(() => {
                //sending mail
                // console.log(res);
                console.log("verfication code saved");
                res.render(
                  "recoveryMail",
                  { code: recCode },
                  function (err, html) {
                    const mailOptions = {
                      from: "docadvisormail@gmail.com", // sender address
                      to: req.body.email, // list of receivers
                      subject: `Account Recovery Code`, // Subject line
                      html: html,
                    };

                    transporter.sendMail(mailOptions, function (err, info) {
                      if (err) {
                        console.log("nodemailer error" + err);
                        res.status(500).json({ error: err });
                      } else {
                        console.log(info);

                        const token = jwt.sign(
                          { email: req.body.email },
                          "20F-1033"
                        ); //, { algorithm: 'RS256' })//, function(err, token) {
                        console.log("token: " + token);

                        res.status(200).json({
                          nextroute: "/signin/forget/v2",
                          email: req.body.email,
                          authToken: token,
                          validMail: 1,
                        });
                      }
                    });
                  }
                );
              })
              .catch((err) => {
                console.log("error at insetion of vercode" + err);
                res.status(500).json({ error: err });
              });
          } else res.status(200).json({ validMail: 0 });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ error: "abcd" });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: "abcd3" });
    });
};

//v2
const verifyRecoveryCode = (req, res) => {
  if (req.header("auth-token")) {
    const code = parseInt(req.body.code, 10);
    const token = req.header("auth-token");
    const data = jwt.verify(token, "20F-1033");
    console.log("code" + code + typeof code + req.header("auth-token"));

    sequelize
      .sync()
      .then(() => {
        RecCode.findOne({
          where: {
            email: data.email,
          },
        })
          .then((data) => {
            console.log("data:  ");
            console.log(typeof data.dataValues.Code); //.verifcationCode.dataValues.Code);
            //res.status(200).json({ verifybit: 1, nextroute: "/" });

            if (data.dataValues.Code === code) {
              RecCode.destroy({
                where: { email: data.email },
              })
                .then((data) => {
                  res
                    .status(200)
                    .json({ verifybit: 1, nextroute: "/signin/forget/v3" });
                })
                .catch((error) => {
                  console.error("Failed to retrieve data : ", error);
                  res
                    .status(500)
                    .json({ verifybit: 0, nextroute: "/signin/forget/v2" });
                });
            } else {
              console.log("mismatch");
              res
                .status(200)
                .json({ verifybit: 0, nextroute: "/signin/forget/v2" });
            }
          })
          .catch((error) => {
            console.error("Failed to retrieve data : ", error);
            res
              .status(500)
              .json({ verifybit: 0, nextroute: "/signin/forget/v2" });
          });
      })
      .catch((error) => {
        console.error("Unable to create table : ", error);
        res.status(500).json({ verifybit: 0, nextroute: "/signin/forget/v2" });
      });
  } else {
    res.status(200).json({
      verifybit: 0,
      nextroute: "/signin",
      //email: req.session.email,
    });
  }
};

const resetPassword = (req, res) => {
  if (req.header("auth-token")) {
    const code = parseInt(req.body.code, 10);
    const token = req.header("auth-token");
    const data = jwt.verify(token, "20F-1033");
    const mail=data.email;
    console.log(mail);
    console.log("code" + code + typeof code + req.header("auth-token"));
    sequelize.sync().then(() => {
      Doctor.update(
      {password: req.body.password},{
        where: {
          email: data.email,
        }}
      )
        .then((data) => {
          console.log("data:  ");
          res.status(200).json({
            resetBit: 1,
            email: mail,
            nextroute: "/",
            
            //email: req.session.email,
          });

        })
        .catch((err) => {
          res.status(500).json({ error: "abcd3" });
        });
    });
  }
  else {
    res.status(200).json({
      resetBit: 0,
      nextroute: "/signin",
      //email: req.session.email,
    });
  }
};

function generateCode() {
  var min = 100000;
  var max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = { sendRecoveryCode, verifyRecoveryCode, resetPassword };
