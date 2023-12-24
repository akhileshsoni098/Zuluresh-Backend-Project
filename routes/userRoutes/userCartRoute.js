

const express = require("express");
const { authentication } = require("../../middi/auth");
const { createCart, updateKart, checkOut, deleteCart } = require("../../controllers/UserCartController");

const router = express.Router()


/////////////////  cart //////////////////////////////

router.route("/addToCart").post(authentication, createCart);

router.route("/updateCart").put(authentication, updateKart);

router.route("/checkOut").get(authentication, checkOut);

router.route("/deleteCart").delete(authentication, deleteCart);


module.exports = router