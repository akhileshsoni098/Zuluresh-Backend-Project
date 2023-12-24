
const User = require('../models/userModel');
//================================================ otp and verify otp and token genration ==============
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const Otp = require("../models/otpModel");
const validation = require("../validations/validation");
const twilio = require("twilio");
const cartModel = require("../models/cartModel");
const { Types } = require('mongoose')

///////////////////////////////////////// SIGN UP //////////////////////////////////////////////////////////

//========================================== 1 ==============================

/////////////////////////////////////////////////// signUp /////////////////////////////

exports.signUp = async (req, res) => {

  try {
  const OTP = otpGenerator.generate(4, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const number = req.body.number;
  console.log(OTP);

  if (!validation.validateMobileNo(number)) {
    return res
      .status(400)
      .send({ status: false, message: "Invalid phone number" });
  }
//======================== twilio (MY AUTH , SID AND VERIFIED PHONE USED) ==============

// const client = twilio(process.env.TWILIO_ACCOUNT_SID,
//    process.env.TWILIO_AUTH_TOKEN);
//     const message = await client.messages.create({
//       body: `Your OTP for registration is ${OTP}`, 
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to:"+91"+ number,
//     });
//     console.log(message);

//==========================================

  const otp = { number: number, otp: OTP };

  const salt = await bcrypt.genSalt(10);

  otp.otp = await bcrypt.hash(otp.otp, salt);

  const result = await Otp.create(otp);
  let allUser = await User.find()
let userId = req.body.userId = `0000${allUser.length+1}`

let user = await User.findOne({ number: req.body.number });

  if (!user) {
    user = await User.create({ number: req.body.number,userId:userId });
  }

  res.status(200).send({otp:OTP, message:"Otp send sucessfully!"});
}catch (error) {
  console.error(error);
  res.status(500).send({ status: false, message: "Failed to send OTP" });
}
};


exports.verifyOtp = async (req, res) => {
  try {
    const otpHolder = await Otp.find({ number: req.body.number });

    if (otpHolder.length === 0) {
      return res.status(400).send({
        status: false,
        message: "You used an expired OTP or the number is invalid!"
      });
    }

    const rightOtpFind = otpHolder[otpHolder.length - 1];

    const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);

    if (rightOtpFind.number === req.body.number && validUser) {
      let user = await User.findOne({ number: req.body.number });

      const token = jwt.sign(
        {
          userId: user.userId,
          _id: user._id,
          number: user.number
        },
        process.env.JWT_SECRET_KEY
      );

      await Otp.deleteMany({ number: req.body.number });

      let cartId;
      let cart = await cartModel.findOne({ userId: user._id });

      // Create cart data based on the request body
      const cartData = {
        items: req.body.items,
        totalPrice: req.body.totalPrice,
        totalItems: req.body.totalItems
      };

      if (!cart) {
        // Creating cart for the user
        const data = {
          userId: user._id,
          userID: user.userId,
          items: cartData.items,
          totalPrice: cartData.totalPrice,
          totalItems: cartData.totalItems
        };

        const addCart = await cartModel.create(data);
        cartId = addCart._id.toString();
      } else {
        // Update the existing cart
        const itemsList = cart.items;

        if (cartData.items.length > 0) {
          cartData.items.forEach(item => {
            const foundItem = itemsList.find(
              cartItem => cartItem.productId.toString() === item.productId
            );

            if (foundItem) {
              foundItem.quantity += item.quantity;
            } else {
              itemsList.push(item);
            }
          });

          cart.totalPrice += cartData.totalPrice;
          cart.totalItems = itemsList.length;

          await cart.save();
        }
      }

      return res.status(200).send({
        status: true,
        message: "User verified successfully!",
        token: token,
        data: user,
        cartId: cartId
      });
    } else {
      return res.status(400).send({ status: false, message: "Your OTP was wrong!" });
    }
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};
 
  
 



