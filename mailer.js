//mailer.js
var Mailer = require("nodemailer");   // Import the Nodemailer library

// Initialize the Authentication of Gmail Options
var transporter = Mailer.createTransport({
  service: "gmail",  // Use Gmail as the email service
  auth: {
    user: "janekeegan.psychology@gmail.com", //email account to send the confirmation email
    pass: "btzv gkqz dfsi zpqz",  // Your Gmail password (Note: Avoid hardcoding passwords in production code)
  },
});

module.exports = transporter; // Export the transporter