const express = require("express");
const { signUp, verifyOtp } = require("../../controllers/userAuthController");

const router = express.Router()

router.route("/signUp").post(signUp);

router.route("/verifiction").post(verifyOtp);



module.exports = router