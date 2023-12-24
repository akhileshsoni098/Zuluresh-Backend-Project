const express = require("express");
const { authentication } = require("../../middi/auth");
const { addAddress, setDefaultAddress, updateAddress, getAllAddresses, getSingleAddress, deleteAddress } = require("../../controllers/UserAddressController");

const router = express.Router()


////////////////// user Addresss ////////////////////

router.route("/addAddress").post(authentication, addAddress);

router
  .route("/setDefaultAddress/:addressId")
  .put(authentication, setDefaultAddress);

router.route("/changeAddress/:addressId").put(authentication, updateAddress);

router.route("/AllAddress").get(authentication, getAllAddresses);

router
  .route("/getSingleAddress/:addressId")
  .get(authentication, getSingleAddress);

router.route("/deleteAddress/:addressId").delete(authentication, deleteAddress);



module.exports = router