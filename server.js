// server.js

require("dotenv").config(); // Load .env variables
const express = require("express"); // Import express
const transporter = require("./mailer"); // Import the transporter from mailer.js

const path = require("path"); // Import the path module
const UserRouter = require("./controllers/User"); // Import User Routes
const TodoRouter = require("./controllers/Todo"); // Import Todo Routes
const AppointmentRouter = require("./controllers/Appointment"); // Import Appointment Router

// DESTRUCTURE ENV VARIABLES WITH DEFAULT VALUES
const { PORT = 3000 } = process.env;

// Create an Express application Object
const app = express();


// GLOBAL MIDDLEWARE
app.use(express.json()); // Parse JSON bodies
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the "public" directory


// ROUTES
// Define a route for the root URL ("/") to serve an HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.use("/user", UserRouter); // Send all "/user" requests to UserRouter for routing
app.use("/todo", TodoRouter); // Send all "/todo" requests to TodoRouter
app.use("/appointments", AppointmentRouter); // Send all "/appointments" requests to AppointmentRouter

// Add cache control headers middleware
// Don't store a copy of the response and to always request a fresh copy from the server
app.use((req, res, next) => {
  // Set cache control headers to prevent caching
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  next();
});

// Define a route to send an email
app.post("/send-email", (req, res) => {
  const emailData = req.body;
  // Send an email using the transporter
  transporter.sendMail(emailData, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Email not sent" });
    } else {
      console.log("Email sent successfully");
      res.status(200).json({ message: "Email sent successfully" });
    }
  });
});

// Start the server and listen on the specified port
app.listen(PORT, () =>  console.log("SERVER STATUS", `Listening on port ${PORT}`));
