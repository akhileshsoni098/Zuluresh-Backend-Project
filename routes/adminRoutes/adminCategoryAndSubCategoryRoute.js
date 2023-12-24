
const express = require("express");
const { createCategory, updateCategory, getSingleCategory, getAllCategory, deleteSingleCategory, createSubCategory, updateSubCategory, getAllSubCategories, getSingleSubCategory, deleteAllSubCategories, deleteSingleSubCategory } = require("../../controllers/adminCategoryAndSubCategoryContro");

const router = express.Router();



////// Category by admin ///////

router.route("/addCategory").post(createCategory);
router.route("/updateCategory/:catId").put(updateCategory);
router.route("/getSingleCategory/:catId").get(getSingleCategory);
router.route("/getAllCategory").get(getAllCategory);
router.route("/deleteSingleCategory/:catId").delete(deleteSingleCategory);

///////////////////// sub Category /////////////////

router.route("/addSubCategory/:catId").post(createSubCategory);
router.route("/updateSubCategory/:catId/:subCatId").put(updateSubCategory);
router.route("/getAllSubCategory/:catId").get(getAllSubCategories);

router.route("/getSingleSubCategory/:subCatId").get(getSingleSubCategory);
// delete All Sub Categories of a Category //
router.route("/deleteAllSubCategory/:catId").delete(deleteAllSubCategories);
router
  .route("/deleteSingleSubCategory/:subCatId")
  .delete(deleteSingleSubCategory);




module.exports = router