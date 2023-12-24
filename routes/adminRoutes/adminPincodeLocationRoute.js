const express = require("express");
const { adminPincode, allPincode, deletePincode } = require("../../controllers/adminPinCodeLocationController");
const router = express.Router()

//////////pincode by admin ////////

router.route("/createPincode").post(adminPincode);

router.route("/getAllPincode").get(allPincode);

router.route("/deletePincode/:id").delete(deletePincode);


module.exports = router