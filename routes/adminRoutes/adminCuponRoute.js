const express = require("express");
const { createCoupon, updateCoupon, getAllCoupon, getCoupon, deleteCoupon } = require("../../controllers/adminCouponCtrl");

const router = express.Router()

///////////////////////////////// Coupon /////////////////////////////

router.route("/addPromo").post(createCoupon);
router.route("/updatePromo/:id").put(updateCoupon);
router.route("/getAllPromo").get(getAllCoupon);
router.route("/getPromo/:id").get(getCoupon);
router.route("/deletePromo/:id").delete(deleteCoupon);



module.exports = router