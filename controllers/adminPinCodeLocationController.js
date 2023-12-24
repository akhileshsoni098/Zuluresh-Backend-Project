const { default: axios } = require("axios");
const Location = require("../models/userLocation");
const AddLocation = require("../models/adminLocation");


/////////////////////////////////////// location added by admin /////////////////////////////////////////



exports.adminPincode = async (req, res) => {
  try{
  let data = req.body;

  let { pincode } = data;

const checkPincode = await AddLocation.findOne({pincode:pincode})
if(checkPincode){
  return  res.status(200).send({status:false , message:"This Area Pincode is already exist"})
}

  const addedLocation = await AddLocation.create(data);
  res.status(201).send({ status: true, data: addedLocation });
}catch(err){
  res.status(500).json({status:false , messsage:err.message})
}
};

/////////////////////// get All pincode by admin ///////////////////////

exports.allPincode = async (req, res) => {
  try{
const allPincode = await AddLocation.find()
if(allPincode.length==0){
  return  res.status(200).send({status:false , message:"This Area Pincode not found"})
}
  res.status(201).send({ status: true, data: allPincode });
}catch(err){
  res.status(500).json({status:false , messsage:err.message})
}
};


//////////////////// delete pincode ///////////////////////////////////


exports.deletePincode = async (req, res) => {
  try{
    let id = req.params.id
const pincode = await AddLocation.findByIdAndDelete(id)
if(!pincode){
  return  res.status(404).send({status:false , message:"This Area Pincode not found"})
}
  res.status(201).send({ status: true, message:"pincode deleted successfully" });
}catch(err){
  res.status(500).json({status:false , messsage:err.message})
}
};



//////////////// (GPS) by current location ====== location data (======= city , state pincode =======);

exports.gpsLocation = async (req, res) => {

  let data = req.body;

  let { state, pincode, city } = data;

  try {
    const checkPincode = await AddLocation.findOne({ pincode: pincode });
    if (!checkPincode) {
      return res
        .status(400)
        .send({
          status: false,
          message: "Oops, like we don't serve your area !",
        });
    }
    const gpsLocationData = await Location.create(data);

    res.status(201).send({ status: true, data: gpsLocationData });
  } catch (error) {
    res.status(500).send({ status: false, message: error.messsage });
  }
};

//////////////////////////////// taking location info through pin code ///////////////////////////////

exports.location = async (req, res) => {

  let data = req.body;

  let { state, pincode, city } = data;

  try {
    const checkPincode = await AddLocation.findOne({ pincode: pincode });
    if (!checkPincode) {
      return res
        .status(400)
        .send({
          status: false,
          message: "Oops, like we don't serve your area !",
        });
    }

    const response = await axios.get(
      `https://api.postalpincode.in/pincode/${pincode}`
    );

    const { PostOffice } = response.data[0];
    const { District, State } = PostOffice[0];

    state = data.state = State;
    city = data.city = District;

    const locationData = await Location.create(data);

    res.status(201).send({ status: true, data: locationData });
  } catch (error) {
    res.status(500).send({ error: "Unable to retrieve user data" });
  }
};


