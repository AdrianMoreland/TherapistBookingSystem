// controllers/Appointment.js
require("dotenv").config(); // load .env variables
const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// Create a new appointment
router.post("/create", async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.json(appointment); // Send the appointment data as a response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create the appointment" });
  }
});

// Retrieve booked appointments for a specific date
router.get("/get-booked-appointments", async (req, res) => {
  try {
    const date = new Date(req.query.date);
    const appointment = await Appointment.find({ date });
    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve booked appointments" });
  }
});

// Fetch appointments for the logged-in user
router.get("/get-user-appointments", async (req, res) => {
  try {
    const userEmail = req.query.userEmail; // Assuming you pass userEmail as a query parameter
    const appointment = await Appointment.find({ username: userEmail });
    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve user appointments" });
  }
});

// Handle appointment cancellation
router.delete("/cancel/:id", async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const deletedAppointment = await Appointment.findByIdAndRemove(appointmentId);

    if (deletedAppointment) {
      res.status(204).end(); // Send a success response with no content
    } else {
      res.status(404).send("Appointment not found"); // Send an error response
    }
  } catch (error) {
    res.status(500).send("Error cancelling appointment");
  }
});

module.exports = router;
