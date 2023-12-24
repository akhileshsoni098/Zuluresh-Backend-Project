


const Product = require("../models/productModel")


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//======================= get product by category and sub category ===========================




exports.getAllProducts = async (req, res)=>{
    try {
      let filter = req.query
  
      let filterdProduct = await Product.find({...filter})
  
  //     if(filterdProduct.length==0){
  
  // return res.status(404).send({status:false, message:"No Product found"})
  
  //     }
  res.status(200).send({stats:true , data:filterdProduct})
  
  }catch(err){
      res.status(500).send({ status: false, message: err.message });
    }
  };
  
  //=========================================================
  
  /////////////////////////////////// get best deals //////////////
  
  
  exports.bestDeals = async (req, res)=>{
    try {
      
  
      let filterdProduct = await Product.find({setAs:"Best Deals"})
  
  //     if(filterdProduct.length==0){
  
  // return res.status(404).send({status:false, message:"No Product found"})
  
  //     }
  res.status(200).send({stats:true , data:filterdProduct})
  
  }catch(err){
      res.status(500).send({ status: false, message: err.message });
    }
  };
  
  ///////////////////////// best Seller /////////
  
  
  exports.bestSeller = async (req, res)=>{
    try {
  
   let filterdProduct = await Product.find({setAs:"Best Seller"})
  
  //     if(filterdProduct.length==0){
  
  // return res.status(404).send({status:false, message:"No Product found"})
  
  //     }
  res.status(200).send({stats:true , data:filterdProduct})
  
  }catch(err){
      res.status(500).send({ status: false, message: err.message });
    }
  };
  
  ////////////////////// Combos ////////////
  
  exports.combos = async (req, res)=>{
    try {
    
  
      let filterdProduct = await Product.find({setAs:"Combos"})
  
  //     if(filterdProduct.length==0){
  
  // return res.status(404).send({status:false, message:"No Product found"})
  
  //     }
  res.status(200).send({stats:true , data:filterdProduct})
  
  }catch(err){
      res.status(500).send({ status: false, message: err.message });
    }
  };
  
  
  
  