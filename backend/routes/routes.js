const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const multer = require("multer");
const regContr = require('../controllers/register.contr');
//const cookieParser = require("cookie-parser");
//const session = require('express-session');
//const cenflix = require("../controllers/cenflixController");
//const {Authentication} = require("../middlewares/auth.js");



/*const storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, "./public/images") },

})*/

const upload = multer({ dest: './assets' });


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());



router.post("/signUp",upload.single("profilepic"),regContr.signUp);












module.exports = router;