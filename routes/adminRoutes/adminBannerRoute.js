const express = require("express")
const { createBanner, getAllBanner, deleteSingleBanner, test } = require("../../controllers/adminBannerCtrl")

const router = express.Router()

router.route("/test").get(test)

router.route("/createBanner").post(createBanner)

router.route("/deleteSingleBanner/:bannerId").delete(deleteSingleBanner)


module.exports = router; 