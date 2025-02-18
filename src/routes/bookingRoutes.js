import express from "express";
import BookingController from "../controllers/bookingController.js";

const router = express.Router();

router.get("/schedule", BookingController.getAvailableDays);
router.post("/reservation", BookingController.createReservation);
router.get("/records", BookingController.getRecords);
router.put("/updateRecord", BookingController.updateRecord);
router.post("/workDone", BookingController.markWorkDone);
router.delete("/deleteRecord", BookingController.deleteRecord);
router.post("/addRecord", BookingController.addRecord);

export default router;