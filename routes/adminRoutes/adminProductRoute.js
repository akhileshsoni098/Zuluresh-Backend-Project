
const express = require("express");
const { ProductData, allProducts, singleProduct, updateProduct, deleteProduct } = require("../../controllers/adminProductConroller");

const router = express.Router();

//================= product add ===================

router.route("/addProduct").post(ProductData);

router.route("/getAllproduct").get(allProducts);

router.route("/getProduct/:Id").get(singleProduct);

router.route("/updateProduct/:id").put(updateProduct);

router.route("/deleteProduct/:Id").delete(deleteProduct);



module.exports = router