const express = require("express");

const adminRouting = express();

const abandonedCartRoute = require("../routes/adminRoutes/adminAbandonedCart");

const bannerRoute = require("../routes/adminRoutes/adminBannerRoute");

const categoryAndSubCategoryRoute = require("../routes/adminRoutes/adminCategoryAndSubCategoryRoute");

const couponRoute = require("../routes/adminRoutes/adminCuponRoute");

const getUserDetailsRoute = require("../routes/adminRoutes/adminGetUserDetailsRoute");

const orderRoute = require("../routes/adminRoutes/adminOrderRoute");

const paymentDataRoute = require("../routes/adminRoutes/adminPaymentDataRoute");

const pincodeLocationRoute = require("../routes/adminRoutes/adminPincodeLocationRoute");

const productRoute = require("../routes/adminRoutes/adminProductRoute");

const shippingRoute = require("../routes/adminRoutes/adminShippingRoute");

const timeSlotRoute = require("../routes/adminRoutes/adminTimeSlotRoute");

adminRouting.use("/abandonCart", abandonedCartRoute);

adminRouting.use("/banner", bannerRoute);

adminRouting.use("/categoryAndSubCategory", categoryAndSubCategoryRoute);

adminRouting.use("/coupon", couponRoute);

adminRouting.use("/userDetails", getUserDetailsRoute);

adminRouting.use("/order", orderRoute);

adminRouting.use("/paymentData", paymentDataRoute);

adminRouting.use("/pincodeLocation", pincodeLocationRoute);

adminRouting.use("/product", productRoute);

adminRouting.use("/shipping", shippingRoute);

adminRouting.use("/timeSlot", timeSlotRoute); 

module.exports = adminRouting;
