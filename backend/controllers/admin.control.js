const Doctor = require("../models/doctor");
const Medicines = require("../models/medicines");
const VerCode = require("../models/verCodeAdmin");
const sequelize = require("../configs/db");
const jwt = require("jsonwebtoken");


const removeDoctor= async (req,res)=>{
    const formData = {
        email: req.body.email,
      };

      let emailDoc=formData.email;
      console.log(emailDoc);
      const row = await Doctor.findOne({
        where: { email: emailDoc },
      });
      
      if (row) {
        await row.destroy(); // deletes the row
        console.log("Deleted");
        res.status(200).json({ nextroute: "/" });
      }

      if(!row)
      {
        res.status(400).json({ nextroute: "/removeDoc" });
      }
      
   
}



const insertMed = (req, res) => {

  const UserName = req.body.name;

  console.log(UserName);


  Medicines.create({
    MedicineName: UserName,
    
  })
    .then(() => {
      // console.log(res);
      console.log("data of Medicine saved");


      res.status(200).json({
        nextroute: "/insertMed",

      });

 
  })
}


module.exports = { removeDoctor , insertMed};

