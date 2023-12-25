const express = require("express");

const { paymentByUser, paymentByOrder } = require("../../controllers/adminAbandonedCartWithPaymentDataController");

const router = express.Router()




////// payment info /////////

router.route("/paymentByUser/:userId").get(paymentByUser);

router.route("/paymentByOrder/:userId").get(paymentByOrder);




module.exports = router