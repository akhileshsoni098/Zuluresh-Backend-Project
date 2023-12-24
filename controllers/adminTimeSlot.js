const TimeSlot = require("../models/timeSlot");
const moment = require("moment");



//////////////////////////// delivery time Slot added by admin //////////////////////////////////////////

exports.timeSlotCreation = async (req, res) => {
  try {
    const { day, timeRange } = req.body;
    const [startTime, endTime] = timeRange.split(" to ");

    const formattedDate = moment(day, "dddd (DD MMM)").format("dddd (DD MMM)");

    if (!moment(day, "dddd (DD MMM)").isValid()) {
      return res.status(400).json({
        message: "Invalid date format",
      });
    }
    if (
      !moment(startTime, "h:mmA").isValid() ||
      !moment(endTime, "h:mmA").isValid()
    ) {
      return res.status(400).json({
        message: "Invalid time format",
      });
    }

    const newTimeSlot = new TimeSlot({
      day: formattedDate,
      startTime,
      endTime,
    });
    console.log(newTimeSlot);
    const tt = await TimeSlot.create(newTimeSlot);

    res.status(201).json({
      message: "Time slot added successfully",
      timeSlot: tt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to add time slot",
      error: error.message,
    });
  }
};


///////////////////////////////////////////////////// get All Time slot for admin ////////////////////////////

exports.allTimeSlotWithId = async (req , res)=>{

  const allSlot = await TimeSlot.find()

  if(allSlot.length ==0){
    return res.status(400).send({status:false , message:"there is no time slot availble"})
  }

  res.status(200).send({status:true , timeSlots:allSlot})
}

/* ////////////////////////////// get allTimeSlot ////////
// rough delete krna h 
exports.getTimeSlots = async (req, res) => {
  try {
    const timeSlots = await TimeSlot.find();

    // Format each time slot
    const formattedTimeSlots = timeSlots.map((slot) => {
      const formattedDate = moment(slot.day, "dddd (DD MMM)").format(
        "dddd (DD MMM)"
      );
      return `${formattedDate} ${slot.startTime} - ${slot.endTime}`;
    });

    res.status(200).json({
      message: "Time slots retrieved successfully",
      timeSlots: formattedTimeSlots,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to retrieve time slots",
      error: error.message,
    });
  }
};
 */

///////////////////////////////////////////////// update timeslot admin  /////////////////////////////////////

exports.updateTimeSlot = async (req, res) => {
  try {
    const slotId = req.params.slotId; 
    const { day, timeRange } = req.body;
    const [startTime, endTime] = timeRange.split(" to ");

    const formattedDate = moment(day, "dddd (DD MMM)").format("dddd (DD MMM)");

    if (!moment(day, "dddd (DD MMM)").isValid()) {
      return res.status(400).json({
        message: "Invalid date format",
      });
    }

    if (
      !moment(startTime, "h:mmA").isValid() ||
      !moment(endTime, "h:mmA").isValid()
    ) {
      return res.status(400).json({
        message: "Invalid time format",
      });
    }

 
    const timeSlot = await TimeSlot.findByIdAndUpdate(
      { _id: slotId },
      { $set: { day: formattedDate, startTime: startTime, endTime: endTime } },
      { new: true }
    );

    if (!timeSlot) {
      return res.status(404).json({
        message: "Time slot not found",
      });
    }

    res.status(200).json({
      message: "Time slot updated successfully",
      timeSlot,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update time slot",
      error: error.message,
    });
  }
};

////////////////////////////////////// delete all time slot admin ////////////////////////////////////////////

exports.deleteAllTimeSlots = async (req, res) => {
  try {
    await TimeSlot.deleteMany();

    res.status(200).json({status:true,
      message: 'All time slots deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to delete all time slots',
      error: error.message,
    });
  }
};

///////////////////////////////////// delete single timeSlot /////////////////////////////////////////////////

exports.deleteSingleTimeSlot = async (req, res) => {
  try {
    const slotId = req.params.slotId; 

    const timeSlot = await TimeSlot.findByIdAndDelete({_id:slotId});

    if (!timeSlot) {
      return res.status(404).json({
        message: 'Time slot not found',
      });
    }


    res.status(200).json({ status:true,
      message: 'Time slot deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to delete time slot',
      error: error.message,
    });
  }
};
  






