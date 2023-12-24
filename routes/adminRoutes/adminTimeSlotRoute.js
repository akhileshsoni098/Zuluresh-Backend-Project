const express = require("express");

const { allTimeSlotWithId, timeSlotCreation, updateTimeSlot, deleteSingleTimeSlot, deleteAllTimeSlots } = require("../../controllers/adminTimeSlot");



const router = express.Router()


//  timeslot
 
router.route("/addTimeSlot").post(timeSlotCreation);

//====== for sumit ....===========
// router.route("/getTimeSlot").get(getTimeSlots)
//======= for admin =======
router.route("/allSlots").get(allTimeSlotWithId);
//======
router.route("/updateTimeSlot/:slotId").put(updateTimeSlot);

router.route("/deleteTimeSlot/:slotId").delete(deleteSingleTimeSlot);

router.route("/deleteAllTimeSlots").delete(deleteAllTimeSlots);




module.exports = router