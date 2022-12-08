const VerCode = require("../models/verCodePat");
const sequelize = require("../configs/db");
const jwt = require("jsonwebtoken");

verifyAuthPat = (req, res, next) => {
  sequelize
    .sync()
    .then(() => {
      VerCode.findOne({
        where: {
          email: req.body.email,
        },
      })
        .then((data) => {
          console.log("data:  ");
          console.log(data); //.verifcationCode.dataValues.Code);
          //res.status(200).json({ verifybit: 1, nextroute: "/" });
          if (data) {
            if (data.dataValues.status === true) {
              next();
            } else {
              const token = jwt.sign({ email: req.body.email }, "20F-1033"); //, { algorithm: 'RS256' })//, function(err, token) {
              console.log("token: " + token);

              return res.status(200).json({
                nextroute: "/verification",
                email: req.body.email,
                authToken: token,
              });
            }
          } 
          else//not registered yet
          { 
            console.log("not found") 
            return res.status(200).json({
              nextroute: "/signup",
            });
          }
        })
        .catch((err) => {
         return res.status(500).json({ error: err });
        });
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });

  //    next();
};


module.exports = {verifyAuthPat}