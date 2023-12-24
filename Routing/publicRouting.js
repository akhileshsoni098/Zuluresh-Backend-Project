const express = require("express");

const publicRouting = express();

const publicRoute = require("../routes/publicRoutes/publicRoute");


publicRouting.use("/public", publicRoute);

module.exports = publicRouting;