const Patient=require("../models/pateint");
const RecCode =  require('../models/recoveryCode');
const sequelize = require("../configs/db");
const jwt = require("jsonwebtoken");
const transporter = require('../configs/mailTranspoter')

const signin = (req, res) => {
  sequelize
    .sync()
    .then(() => {
      Patient.findOne({
        where: {
          email: req.body.email,
        },
      })
        .then((data) => {
          console.log("data:  ");
          console.log(data.dataValues); //.verifcationCode.dataValues.Code);
          //res.status(200).json({ verifybit: 1, nextroute: "/" });

          if (data.dataValues.password !== req.body.password) {
            //miss matach
            res.status(200).json({
              nextroute: "/signin",
              error: "Invalid email or Password",
            });
          } else if (data.dataValues.password === req.body.password) {
            //password matached
            const token = jwt.sign({ email: req.body.email }, "20F-1033"); //, { algorithm: 'RS256' })//, function(err, token) {
            console.log("token: " + token);

            res.status(200).json({
              nextroute: "/",
              email: req.body.email,
              authToken: token,
            });
          }
        })
        .catch((err) => {
          res.status(500).json({ error: "abcd" });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: "abcd3" });
    });
};


module.exports = { signin };


