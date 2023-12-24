const express = require("express");
const { authentication } = require("../../middi/auth");
const { createOrder, getOrderDetails, getAllOrders } = require("../../controllers/userOrdersController");

const router = express.Router()


// orderModel

router.route("/createOrder/:addressId").post(authentication, createOrder);

router.route("/getOrder/:orderId").get(authentication, getOrderDetails);

router.route("/allOrders").get(authentication, getAllOrders);



module.exports = router 