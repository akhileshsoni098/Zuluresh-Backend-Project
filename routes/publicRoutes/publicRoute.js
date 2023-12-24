const express = require("express");

const { getAllProducts, bestDeals, bestSeller, combos } = require("../../controllers/userGetProductbySetAs");
const { getTimeSlots } = require("../../controllers/UserCartController");
const { promoDeduct } = require("../../controllers/adminCouponCtrl");
const { location } = require("../../controllers/adminPinCodeLocationController");
const { getAllBanner } = require("../../controllers/adminBannerCtrl");


const router = express.Router()

//////////////// user + admin ///////////////////

router.route("/products").get(getAllProducts);

router.route("/bestDeals").get(bestDeals);

router.route("/bestSeller").get(bestSeller);

router.route("/combos").get(combos);

///////////////////////// user + admin time slot /////////////////

router.route("/getTimeSlot").get(getTimeSlots);

// promo discount ///

router.route("/promoDiscount").post(promoDeduct);


// location by pincode


router.route("/location").post(location);

// banner 
router.route("/getAllBanner").get(getAllBanner) 

module.exports = router