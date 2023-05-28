const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODE_MILER_ACCOUNT,
    pass: process.env.NODE_MAILER
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
