// models/Appointment.js
const { Schema, model } = require("../db/connection");

const AppointmentSchema = new Schema({
  username: { type: String, required: true },
  date: { type: Date, required: true },
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
  notification_method: { type: String, required: true },
});



const Appointment = model("Appointment", AppointmentSchema);

module.exports = Appointment;