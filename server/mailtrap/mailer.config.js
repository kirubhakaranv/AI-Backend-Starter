const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App password
  },
});

const sender = {
  email: process.env.EMAIL_USER,
  name: "Fixly",
};

module.exports = { transporter, sender };
