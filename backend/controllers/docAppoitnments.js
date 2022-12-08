const Doctor = require("../models/doctor");
const Slots = require("../models/slots");
const sequelize = require("../configs/db");
const Comment = require('../models/comment');
const jwt = require("jsonwebtoken");

const fetchappointments = (req, res) => {
  try {
    if (req.header("auth-token")) {
      const token = req.header("auth-token");
      const data = jwt.verify(token, "20F-1033");
      const patientEmail = data.email;
      sequelize
        .sync()
        .then(() => {
          Slots.findAll({
            where: {
              email: patientEmail,
            },
          })
            .then((data) => {
              console.log("data:  ", data);
              res
                .status(200)
                .json({ data: data, message: "your booked appointments" });
            })
            .catch((error) => {
              console.error("Failed to retrieve data : ", error);
              res.status(500).json({ error: error });
            });
        })
        .catch((error) => {
          console.error("Unable to create table : ", error);
          res.status(500).json({ error: error.TypeError });
        });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};


const fetchcomments = (req, res) => {
  try {
    if (req.header("auth-token")) {
      const token = req.header("auth-token");
      const data = jwt.verify(token, "20F-1033");
      const docEmail = data.email;
      sequelize
        .sync()
        .then(() => {
          Comment.findAll({
            where: { Patientid: req.body.Pid,  Doctorid:docEmail},
          })
            .then((data) => {
              console.log("data:  ", data);
              res.status(200).json({ data: data, message: "comment fetched" });
            })
            .catch((error) => {
              console.error("Failed to retrieve data : ", error);
              res.status(500).json({ error: error });
            });
        })
        .catch((error) => {
          console.error("Unable to create table : ", error);
          res.status(500).json({ error: error.TypeError });
        });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const fetchreply = (req, res) => {
  try {
    if (req.header("auth-token")) {
      const token = req.header("auth-token");
      const data = jwt.verify(token, "20F-1033");
      const patientEmail = data.email;
      console.log(req.body);
      sequelize
        .sync()
        .then(() => {
          Reply.findAll({
            where: { Commentid: req.body.Cid },
          })
            .then((data) => {
              console.log("data:  ", data);
              res.status(200).json({ data: data, message: "reply fetched" });
            })
            .catch((error) => {
              console.error("Failed to retrieve data : ", error);
              res.status(500).json({ error: error });
            });
        })
        .catch((error) => {
          console.error("Unable to create table : ", error);
          res.status(500).json({ error: error.TypeError });
        });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const addreply = (req, res) => {
  try {
    if (req.header("auth-token")) {
      const token = req.header("auth-token");
      const data = jwt.verify(token, "20F-1033");
      const patientEmail = data.email;
      sequelize
        .sync()
        .then(() => {
          Reply.create({
            Commentid: req.body.Cid,
            Date: req.body.date,
            ReplyBy: req.body.replyby,
            Reply: req.body.reply,
          })
            .then((data) => {
              console.log("data:  ", data);
              res.status(200).json({ data: data, message: "reply added" });
            })
            .catch((error) => {
              console.error("Failed to retrieve data : ", error);
              res.status(500).json({ error: error });
            });
        })
        .catch((error) => {
          console.error("Unable to create table : ", error);
          res.status(500).json({ error: error.TypeError });
        });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};



module.exports = {
  fetchappointments,
  fetchcomments,
  fetchreply,
  addreply,
};




