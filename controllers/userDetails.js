const UserModel = require("../models/userModel");
const addressInfo = require("../models/addressInfo");
const CustomerDetails = require("../models/userDetails");

// create user dummy Profile

exports.createCustomerData = async (req, res) => {
  try {
    let userId = req.user._id;
    let data = req.body;

    let { customerId, name, customerNumber ,userObjectId} = data;

    let userNumber = await UserModel.findById(userId);

    if (!userNumber) {
      return res
        .status(400)
        .json({ status: false, message: "Verify your number" });
    }



let joinedDate = new Date(userNumber.createdAt);
let formattedJoinedDate = joinedDate.toLocaleString("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});

     userObjectId = data.userObjectId = req.user._id
    customerId = data.customerId = req.user.userId;
    customerNumber = data.customerNumber = userNumber.number;

 const createdCustomerDetails = await CustomerDetails.create({
      customerId,
      joinedDate: formattedJoinedDate,
      customerNumber,
      userObjectId
    });

    res.status(201).json({ status: true, data: createdCustomerDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, error: error.message });
  }
};

// update details ..... default

exports.updateCustomer = async (req, res) => {
  try {
    let addressId = req.params.addressId;
    let userId = req.user._id;
    let data = req.body;

    let { customerId, name, customerNumber } = data;

    let userNumber = await UserModel.findById(userId);

    if (!userNumber) {
      return res
        .status(400)
        .json({ status: false, message: "Verify your number" });
    }

    let userAddress = await addressInfo.findOne({
      _id: addressId,
      userId: userId,
    });

    if (!userAddress) {
      return res
        .status(400)
        .json({ status: false, message: "Provide your address" });
    }

    
    customerNumber = userNumber.number;

    const updatedCustomerDetails = await CustomerDetails.findOneAndUpdate(
      { userObjectId: req.user._id },
      {
        customerId,
        name: userAddress.name,
        address: {
          pincode: userAddress.pinCode,
          locality: userAddress.locality,
        },
        customerNumber,
      },
      { new: true }
    );

    res.status(200).json({ status: true, data: updatedCustomerDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, error: error.message });
  }
};

// working get profile for user 

exports.getProfile = async (req, res) => {
  try {
    let userId = req.user._id;

    if (!userId) {
      return res.status(401).json({ status: false, message: "Verify your number" });
    }
   
    let userData = await UserModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ status: false, message: "User data not found" });
    }
    const formattedCreatedAt = userData.createdAt.toISOString().substr(0, 10);

    let userProfile = {
      number: req.user.number,
      customerId: userId,
      createdAt: formattedCreatedAt,
      address: {}
    };

    let userAddress = await addressInfo.findOne({ userId: userId, setAsDefault: true });

    if (userAddress) {
      userProfile.address.pincode = userAddress.pinCode;
      userProfile.address.locality = userAddress.locality;
      userProfile.name = userAddress.name;
    }

    res.status(200).json({ status: true, data: userProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, error: error.message });
  }
};



