const express = require("express");
const { authentication } = require("../../middi/auth");
const { createCustomerData, updateCustomer, getProfile } = require("../../controllers/userDetails");

const router = express.Router()



/////////////////// create profile for admin but it will be in user ///////

router.route("/profile").post(authentication, createCustomerData);

router.route("/default/:addressId").put(authentication, updateCustomer);

router.route("/getprofile").get(authentication, getProfile);


module.exports = router