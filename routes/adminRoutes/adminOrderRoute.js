const express = require("express");


const { getAllOrdersAdmin, getparticularOrderData, updateOrderAdmin } = require("../../controllers/adminOrderController");


const router = express.Router()



router.route("/getAllOrders").get(getAllOrdersAdmin);

router.route("/getSingleOrder/:orderId").get(getparticularOrderData);

router.route("/updateOrder/:orderId").put(updateOrderAdmin);


module.exports = router