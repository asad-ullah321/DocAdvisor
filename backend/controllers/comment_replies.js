const Doctor = require("../models/doctor");
const Slots = require("../models/slots");
const sequelize = require("../configs/db");
const Comment = require('../models/comment');
const jwt = require("jsonwebtoken");

const fetchAppointmentsComment = (req, res)=>{
  try {
    if (req.header("auth-token")) {
      const token = req.header("auth-token")
      const data = jwt.verify(token, "20F-1033");
      const patientEmail = data.email;
      sequelize
        .sync()
        .then(() => {
          Slots.findAll(
            {
              where: {
                BookedBy: patientEmail,
              },
            }
          )
            .then((data) => {
              console.log("data:  ", data);
              res.status(200).json({data:data, message: "your booked appointments"})
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
}



module.exports = { fetchDoctors, fetchslots, bookslot,fetchappointments };
