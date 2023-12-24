const { isValidObjectId } = require("mongoose");
const Product = require("../models/productModel");
const cloudinary = require("cloudinary");
const Shipping = require("../models/delivereyChargeModel")
const {category, subCategory} = require("../models/CategoryModel")

/////////////////////////////////////////////  create product  ///////////////////////////////////////////

exports.ProductData = async (req, res) => {
  try {
    let data = req.body;

    let {
      title,
      description,
      weightperKg,
      pieces,
      MRP,
      price,
      discount,
      sub_category,
      Stock,
    } = data;

    if (!title) {
      return res
        .status(400)
        .send({ status: false, message: 'Provide title for your product' });
    }
    if (!description) { 
      return res
        .status(400)
        .send({ status: false, message: 'Provide description of your product' });
    }
    if (!weightperKg && !pieces) {
      return res
        .status(400)
        .send({ status: false, message: 'Provide weight or pieces of product' });
    }
    if (!MRP) {
      return res.status(400).send({ status: false, message: 'Provide MRP of this product' });
    }
    if (!price) {
      return res
        .status(400)
        .send({ status: false, message: 'Provide selling price of this product' });
    }


    /// new updated code ///
if(!data.category){
  return res.status(400)
  .send({ status: false, message: 'Please Provide Category of the Product' });
}


if(!sub_category){
  return  res.status(400)
  .send({ status: false, message: 'Please Provide Sub Category of the Product' });
}

const checkCategory = await category.findOne({categoryName:data.category})

if(!checkCategory){
  return  res.status(400)
  .send({ status: false, message: 'Please Provide available Category of the Product' });
}


const checkSubCategory = await subCategory.findOne({subCategoryName:sub_category})

if(!checkSubCategory){
 return res.status(400)
  .send({ status: false, message: 'Please Provide available Sub Category of the Product' });
}
////////////////////////////////////////////////////////



    let dis = ((MRP - price) / MRP) * 100;
    discount = data.discount = `${Math.ceil(dis)}%`;

    if (!req.files || !req.files.productImg) {
      return res
        .status(400)
        .send({ status: false, message: 'Provide your product image' });
    }

    let images = req.files.productImg;

    if (!Array.isArray(images)) {
      images = [images];
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i].tempFilePath, {
        folder: 'products',
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    data.productImg = imagesLinks;

    const saveProduct = await Product.create(data);

    res.status(201).send({ status: true, data: saveProduct });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, message: 'An error occurred' });
  }
}

////////////////////////////////////////////  get all product  ///////////////////////////////////////////

exports.allProducts = async (req,res)=>{

let allProduct = await Product.find()

res.status(200).send({status:true , data:allProduct})

}


//////////////////////////////////////////// get Single Product  ///////////////////////////////////////////

exports.singleProduct = async (req, res)=>{
  let productId = req.params.Id
  console.log(productId)
  const particularProduct = await Product.findById(productId)
  res.status(200).send({status:true , data:particularProduct})
}

//////////////////////////////////////////// update product ///////////////////////////////////////////


exports.updateProduct = async (req, res) => {
  try {

    if (!isValidObjectId(req.params.id)) {
      return res
        .status(400)
        .send({ status: false, message: "Not valid Object Id" });
    }

const data = req.body

if(data.category){
const checkCategory = await category.findOne({categoryName:data.category})

if(!checkCategory){
  return  res.status(400)
  .send({ status: false, message: 'Please Provide available Category of the Product' });
}

}

if(data.sub_category){
const checkSubCategory = await subCategory.findOne({subCategoryName:sub_category})

if(!checkSubCategory){
 return res.status(400)
  .send({ status: false, message: 'Please Provide available Sub Category of the Product' });
}
}

    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(400).send({ status: true, message: "Not valid ObjectId" });
    }

    // Images Start Here
    if (req.files && req.files.productImg) {
      let images = req.files.productImg;

      if (!Array.isArray(images)) {
        images = [images];
      }

      const imagesLinks = [];

      // Delete previous productImg from Cloudinary
      for (let i = 0; i < product.productImg.length; i++) {
        await cloudinary.v2.uploader.destroy(product.productImg[i].public_id);
      }

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i].tempFilePath, {
          folder: 'products',
        });

        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }

      data.productImg = imagesLinks;
    }

    product = await Product.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).send({ status: true, product });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

//////////////////////////////////////////// delete Product  ///////////////////////////////////////////


exports.deleteProduct = async (req, res)=>{

  let productId = req.params.Id
 
  const particularProduct = await Product.findByIdAndDelete(productId)

  res.status(200).send({status:true , message:"deleted Sucessfully"})

}







