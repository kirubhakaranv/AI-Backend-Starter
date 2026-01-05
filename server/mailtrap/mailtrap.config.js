const { MailtrapClient } = require("mailtrap");
const dotenv = require("dotenv");
dotenv.config();
const TOKEN = process.env.MAILTRAP_TOKEN;

const mailtrapclient = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "hello@demomailtrap.co",
  name: "Mailtrap Test",
};


module.exports={mailtrapclient,sender};
