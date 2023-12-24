
const { isValidObjectId } = require("mongoose");
const Product = require("../models/productModel");
const cloudinary = require("cloudinary");
const Shipping = require("../models/delivereyChargeModel")




//////////////////////////////////////////// Shipping charge & free shipping limit admin ///////////////////////////////////////////

exports.shippingChargeAdmin = async (req,res)=>{

    let data = req.body
    let {shippingCharge,freeShipingLimit} = data
    shippingCharge = Number(data.shippingCharge)
    freeShipingLimit = Number(data.freefreeShipingLimit)
    const saveData = await Shipping.create(data)
    
    res.status(200).send({status:true , data:saveData})
     
    } 
    
    
    //////////////////////////////////////////// delete shipping charge admin ///////////////////////////////////////////
    
    exports.deleteShippingChargeAdmin = async (req, res)=>{
      try{
      let shippingId = req.params.shippingId
    
      await Shipping.findByIdAndDelete(shippingId)
    res.status(200).send({status:true , message:"shipping amonunt and limit is successfully deleted"})
  }catch(err){
    res.status(500).json({status:false , message:err.message})
  }
    }
    
    
    //////////////////////////////////////////// get shipping  ///////////////////////////////////////////
    
    exports.gettShippingCharge = async (req , res)=>{
    try{
    const shippingData = await Shipping.find()
    
    res.status(200).send({status:true , message:shippingData})
    
    }catch(err){
      res.status(500).json({status:false , message:err.message})
    }
    }
    
    
    
    
    
    