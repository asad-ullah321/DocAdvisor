const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const multer = require("multer");
const regContr = require('../controllers/register.contr');
const signinContr = require('../controllers/signin.contr')
const pasResetContr = require('../controllers/passwordReset')
const cookieParser = require("cookie-parser");
const session = require('express-session');

const { verifyAuth } = require("../middleware/auth.js");

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
router.post("/verify", regContr.Verify);
router.post("/signin",[verifyAuth] ,signinContr.signin);
router.post("/signin/forget/v1", pasResetContr.sendRecoveryCode);
router.post("/signin/forget/v2", pasResetContr.verifyRecoveryCode);
router.post("/signin/forget/v3", pasResetContr.resetPassword);
















module.exports = router;