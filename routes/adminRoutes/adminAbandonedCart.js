





const express = require("express");

const { abandonedCart } = require("../../controllers/adminAbandonedCartWithPaymentDataController");



const router = express.Router()


//  abandoned cart for admin /////


router.route("/abandonCart").get(abandonedCart);

module.exports = router