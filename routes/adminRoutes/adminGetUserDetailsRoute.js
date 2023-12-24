const express = require("express");
const { getAllUserProfiles, getSingleUserProfile, updateUserProfileAdmin, exportUserProfilesToExcel } = require("../../controllers/adminGetUserDetailsWithExcel");




const router = express.Router()


/////////// get all profile customer //////////

router.route("/allProfile").get(getAllUserProfiles);

router.route("/getSingleProfile/:profileId").get(getSingleUserProfile);

router.route("/updateSingleProfile/:profileId").put(updateUserProfileAdmin);

router.route("/exportsProfiledata").get(exportUserProfilesToExcel);


module.exports = router