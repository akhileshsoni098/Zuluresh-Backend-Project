const UserModel = require("../models/userModel");
const addressInfo = require("../models/addressInfo");
const CustomerDetails = require("../models/userDetails");

const XLSX = require('xlsx');

const XLSXStyle = require('xlsx-style');



// get all profiles (admin )

exports.getAllUserProfiles = async (req, res) => {
  try {
    const allUserProfiles = await CustomerDetails.find();
    let count = allUserProfiles.length;
    res.status(200).json({ status: true, data: allUserProfiles, count: count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, error: error.message });
  }
};


// get single profile (admin)

exports.getSingleUserProfile = async (req, res) => {
    try {
      let profileId = req.params.profileId;
  
      const userProfile = await CustomerDetails.findById(profileId);
  
      if (!userProfile) {
        return res.status(404).json({ error: "User profile not found" });
      }
  
      res.status(200).json({ status: true, data: userProfile });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: false, error: error.message });
    }
  };
  

// update customer profile( admin )

exports.updateUserProfileAdmin = async (req, res) => {
  try {
    let profileId = req.params.profileId;
    let data = req.body;
    const userProfile = await CustomerDetails.findOneAndUpdate(
      { _id: profileId },
      { ...data },
      { new: true }
    );

    if (!userProfile) {
      return res.status(404).json({status:false , message: "User profile not found" });
    }

    res.status(200).json({ status: true, data: userProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, error: error.message });
  }
};

// export data into excel

exports.exportUserProfilesToExcel = async (req, res) => {
  try {
    const allUserProfiles = await CustomerDetails.find();

    // Convert user profiles data to the desired format for Excel
    const excelData = allUserProfiles.map((profile, index) => ({
      'Serial No.': index + 1,
      'Customer ID': profile.customerId.toString(),
      'Name': profile.name,
      'Address': `${profile.address.locality}, ${profile.address.pincode}`,
      'Customer Number': profile.customerNumber,
      'Joined Date': profile.joinedDate,
    }));

  
    const workbook = XLSX.utils.book_new();


    const worksheet = XLSX.utils.json_to_sheet(excelData);


    const boldCellStyle = { font: { bold: true } };


    const boldColumns = ['B', 'C', 'D', 'E', 'F']; 
    boldColumns.forEach((column) => {
      const cellAddress = column + '1'; 
      worksheet[cellAddress].s = boldCellStyle;
    });

    XLSX.utils.book_append_sheet(workbook, worksheet, 'User Profiles');

    const excelFileBuffer = XLSXStyle.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename=UserProfiles.xlsx',
    });

    res.send(excelFileBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, error: error.message });
  }
};




