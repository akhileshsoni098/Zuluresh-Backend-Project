
const express = require("express");
const { shippingChargeAdmin, deleteShippingChargeAdmin, gettShippingCharge } = require("../../controllers/adminShippingController");

const router = express.Router();

router.route("/shippingCharge").post(shippingChargeAdmin);

router.route("/deleteShipping/:shippingId").delete(deleteShippingChargeAdmin);

router.route("/getShipping").get(gettShippingCharge);


module.exports = router