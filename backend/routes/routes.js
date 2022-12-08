const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const multer = require("multer");
const regContr = require('../controllers/register.contr');
const signinContr = require('../controllers/signin.contr')
const pasResetContr = require('../controllers/passwordReset')
const doctorContr = require('../controllers/doctor')
const patientContr = require('../controllers/patient')
const regPateint = require('../controllers/signupPat.control');
const signinPat = require('../controllers/signinPat');
const signinAdmin = require('../controllers/signinAdmin');
const adminControl = require('../controllers/admin.control');
const pasResetContrPat = require('../controllers/passwordResetPat')
const cookieParser = require("cookie-parser");
const session = require('express-session');

const { verifyAuth } = require("../middleware/auth.js");
const { verifyAuthPat } = require("../middleware/authPat.js");
const { verifyAuthAdmin } = require("../middleware/authAdmin.js");
const  DocAptContr = require('../controllers/docAppoitnments')
router.use(cookieParser());

/*router.use(
    session({
        secret: "20F-1033_20F-0148",
        resave: false,
        saveUninitialized: false,
       cookie: {  sameSite:'none',
       //httpOnly: false,
        secure: false, 
        maxAge: 24 * 60 * 60 * 1000 
        //domain:'.localhost:3000' }
        }
    })

);*/

/*const storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, "./public/images") },

})*/

const upload = multer({ dest: './assets' });


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());



router.post("/signUp",upload.single("profilepic"),regContr.signUp);
router.post("/signUpPat",upload.single("profilepic"),regPateint.signUp);


router.post("/verify", regContr.Verify);
router.post("/verifypat", regPateint.Verify);
//router.post("/verifyAdmin", regPateint.Verify);


router.post("/signin",[verifyAuth] ,signinContr.signin);
router.post("/signinPat",[verifyAuthPat] ,signinPat.signin);
router.post("/signinAdmin",[verifyAuthAdmin] ,signinAdmin.signin);



router.post("/signin/forget/v1", pasResetContr.sendRecoveryCode);
router.post("/signin/forget/v2", pasResetContr.verifyRecoveryCode);
router.post("/signin/forget/v3", pasResetContr.resetPassword);
router.post("/addSlots", doctorContr.addSlots);


router.post("/fetchdoctors", patientContr.fetchDoctors)
router.post("/fetchslots", patientContr.fetchslots)
router.post("/bookslot", patientContr.bookslot)
router.post("/fetchappointments", patientContr.fetchappointments)
router.post("/addcomment", patientContr.addComment)
router.post("/addreply", patientContr.addreply)
router.post("/fetchcomment", patientContr.fetchcomments)
router.post("/fetchreply", patientContr.fetchreply)
router.post("/updaterating", patientContr.updateRating)
router.post("/fetchAllComments", patientContr.fetchAllComments)
router.post("/rating", patientContr.rating)




  router.post("/fetchappointmentsdoc", DocAptContr.fetchappointments)
  router.post("/fetchcommentdoc", DocAptContr.fetchcomments)
  router.post("/addreply", DocAptContr.addreply)







router.post("/signin/forget/v1Pat", pasResetContrPat.sendRecoveryCode);
router.post("/signin/forget/v2Pat", pasResetContrPat.verifyRecoveryCode);
router.post("/signin/forget/v3Pat", pasResetContrPat.resetPassword);


router.post("/RemoveDoc",[verifyAuthAdmin] ,adminControl.removeDoctor);
router.post("/insertMed",[verifyAuthAdmin] ,adminControl.insertMed);
















module.exports = router;