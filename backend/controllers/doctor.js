const Doctor = require("../models/doctor");
const Slots = require("../models/slots");
const sequelize = require("../configs/db");
const jwt = require("jsonwebtoken");

//{"date":"2022-12-09","slotsData":[{"slot":"6:00:7:00pm"},{"slot":"6:00:7:00pm"}]}
const addSlots = (req, res) => {
  if (req.header("auth-token")) {
    const code = parseInt(req.body.code, 10);
    const token = req.header("auth-token");
    const data = jwt.verify(token, "20F-1033");
    console.log("code" + code + typeof code + req.header("auth-token"));

    sequelize.sync().then(() => {
      console.log("Table created successfully!"); //saving doc data
      Doctor.findOne({ where: { email: data.email } }).then((data) => {
        console.log("data:  ");
        if (data) {
          saveSlots(req.body, data.email).then(() => {
            return res.status(200).json({ message: "Slots Added Succesfully" }), (err)=>{ return res.status(400).json({ message: "Slots Not Added Succesfully" })};
          });
        }
      });
    });
  } else {
    res.status(200).json({
      verifybit: 0,
      nextroute: "/signin",
      //email: req.session.email,
    });
  }
};

async function saveSlots(body, docemail) {
  body.slotsData.map((slots) => {
    Slots.create({
      date: body.date,
      email: docemail,
      slot:slots.slot,
      status:false,
      rating: 0
    })
      .then((data) => console.log(data))
      .catch((err) => {
        throw new Error(err);
      });
  });
}

module.exports = { addSlots };
