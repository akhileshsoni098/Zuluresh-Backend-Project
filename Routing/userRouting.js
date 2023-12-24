const express = require("express");

const userRouting = express();

const authRoute = require("../routes/userRoutes/userAuthRoute");

const detailsRoute = require("../routes/userRoutes/userDetailsRoute");

const addressRoute = require("../routes/userRoutes/userAddressRoute");

const cartRoute = require("../routes/userRoutes/userCartRoute");

const orderRoute = require("../routes/userRoutes/userOrderRoute");

userRouting.use("/auth", authRoute);

userRouting.use("/details", detailsRoute);

userRouting.use("/address", addressRoute);

userRouting.use("/cart", cartRoute);

userRouting.use("/order", orderRoute);

module.exports = userRouting;
