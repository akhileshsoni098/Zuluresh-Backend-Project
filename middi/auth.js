
const jwt = require("jsonwebtoken")
const cartModel = require("../models/cartModel");


//==================== authentication ===============================


exports.authentication = function (req, res, next){

    let token = req.headers["x-auth-token"]

if(!token) {return res.status(400).send({status:false , message:"Please provide your number and verify yourself "})}

jwt.verify(token , process.env.JWT_SECRET_KEY, async function(err, decoded){

    if(err) {

    return res.status(401).send({status:false , message: err.message})

    }

else {

    req.user = decoded 
    // console.log(req.user)
    // console.log(req.user.userId)
    req.role = decoded.role
    // const role = req.role
    // console.log(role)
    next()
    
}

})

}

// ======================= adimin authorizartion ====================


exports.authorization = async (req, res, next )=>{
    let role = req.role
console.log(role)
    if(role != "admin"){
     return   res.status(403).send({status:false, message:"Unauthorize Access"})
    }
    next()
}