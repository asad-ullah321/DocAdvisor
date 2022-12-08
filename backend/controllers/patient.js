const Doctor = require("../models/doctor");
const Slots = require("../models/slots");
const sequelize = require("../configs/db");
const Comment = require("../models/comment");
const Reply = require("../models/reply");
const jwt = require("jsonwebtoken");

const fetchDoctors = (req, res) => {
  try {
    let condition;
    if (req.body.city === "" && req.body.type === "") {
      condition = {
        where: {},
      };
    } else if (req.body.city !== "" && req.body.type === "") {
      condition = {
        where: { city: req.body.city },
      };
    } else if (req.body.city === "" && req.body.type !== "") {
      condition = {
        where: { specialization: req.body.type },
      };
    } else if (req.body.city !== "" && req.body.type !== "") {
      condition = {
        where: { specialization: req.body.type, city: req.body.city },
      };
    }
    console.log(condition);
    sequelize
      .sync()
      .then(() => {
        Doctor.findAll(condition)
          .then((data) => {
            console.log("data:  ");

            if (data) {
              res.status(200).json({ Doctors: data, message: "doctor Found" });
            } else {
              res.status(200).json({ message: "No doctor Found" });
            }
          })
          .catch((error) => {
            console.error("Failed to retrieve data : ", error);
          });
      })
      .catch((error) => {
        console.error("Unable to create table : ", error);
      });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
const fetchAllComments = (req, res) => {
  try {
    if (req.header("auth-token")) {
      const token = req.header("auth-token");
      const data = jwt.verify(token, "20F-1033");
      const patientEmail = data.email;
      sequelize
        .sync()
        .then(() => {
          Comment.findAll({
            where: { Doctorid: req.body.Did },
          })
            .then((data) => {
              console.log("data:  ", data);
              res.status(200).json({
                data: data,
                message: `comments fetched for doc${data[0].Doctorid}`,
              });
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
const fetchslots = (req, res) => {
  try {
    sequelize
      .sync()
      .then(() => {
        Slots.findAll({
          where: {
            email: req.body.email,
            date: req.body.date,
            status: 0,
          },
        })
          .then((data) => {
            console.log("data:  ", data);

            if (data) {
              res.status(200).json({ slots: data, message: "slot found" });
            } else {
              res.status(200).json({ message: "No slot Found" });
            }
          })
          .catch((error) => {
            console.error("Failed to retrieve data : ", error);
          });
      })
      .catch((error) => {
        console.error("Unable to create table : ", error);
        res.status(500).json({ error: error });
      });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const bookslot = (req, res) => {
  try {
    if (req.header("auth-token")) {
      const token = req.header("auth-token");
      const data = jwt.verify(token, "20F-1033");
      const patientEmail = data.email;
      sequelize
        .sync()
        .then(() => {
          Slots.update(
            { BookedBy: patientEmail, status: true },
            {
              where: {
                email: req.body.email,
                slot: req.body.slot,
                date: req.body.date,
              },
            }
          )
            .then((data) => {
              console.log("data:  ", data);
              res.status(200).json({ data: data, message: "Slot Booked" });
            })
            .catch((error) => {
              console.error("Failed to retrieve data : ", error);
              res.status(500).json({ error: error });
            });
        })
        .catch((error) => {
          console.error("Unable to create table : ", error);
          res.status(500).json({ error: error });
        });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

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
              BookedBy: patientEmail,
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

const addComment = (req, res) => {
  try {
    if (req.header("auth-token")) {
      const token = req.header("auth-token");
      const data = jwt.verify(token, "20F-1033");
      const patientEmail = data.email;
      sequelize
        .sync()
        .then(() => {
          Comment.create({
            Date: req.body.date,
            Comment: req.body.comment,
            Patientid: patientEmail,
            Doctorid: req.body.Did,
          })
            .then((data) => {
              console.log("data:  ", data);
              res.status(200).json({ data: data, message: "comment added" });
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
      const patientEmail = data.email;
      sequelize
        .sync()
        .then(() => {
          Comment.findAll({
            where: { Patientid: patientEmail, Doctorid: req.body.Did },
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

const updateRating = (req, res) => {
  try {
    if (req.header("auth-token")) {
      const token = req.header("auth-token");
      const data = jwt.verify(token, "20F-1033");
      const patientEmail = data.email;
      console.log(req.body);
      sequelize
        .sync()
        .then(() => {
          Slots.update(
            { rating: req.body.rating },
            {
              where: {
                id: req.body.id,
                BookedBy: patientEmail,
                status: true,
              },
            }
          )
            .then((data) => {
              console.log("data:  ", data);
              res.status(200).json({ data: data, message: "Slot Booked" });
            })
            .catch((error) => {
              console.error("Failed to retrieve data : ", error);
              res.status(500).json({ error: error });
            });
        })
        .catch((error) => {
          console.error("Unable to create table : ", error);
          res.status(500).json({ error: error });
        });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const rating = (req, res) => {
  try {
    if (req.header("auth-token")) {
      const token = req.header("auth-token");
      const data = jwt.verify(token, "20F-1033");
      const patientEmail = data.email;
      console.log(req.body);
      sequelize
        .sync()
        .then(() => {
          Slots.findAll({
            where: {
              email: req.body.Did,
            },
          })
            .then((data) => {
              console.log("data:  ", data);
              let total = 0;
              data.map((d) => {
                total += d.rating;
              });
              const rating = Math.floor(total / data.length);
              console.log(rating);
              res
                .status(200)
                .json({ rating, email: req.body.Did, message: "rating" });
            })
            .catch((error) => {
              console.error("Failed to retrieve data : ", error);
              res.status(500).json({ error: error });
            });
        })
        .catch((error) => {
          console.error("Unable to create table : ", error);
          res.status(500).json({ error: error });
        });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = {
  rating,
  fetchDoctors,
  fetchslots,
  bookslot,
  fetchappointments,
  addComment,
  fetchcomments,
  fetchreply,
  addreply,
  updateRating,
  fetchAllComments,
};
