const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

const app = express();

// ✅ Use only ONE mongoose.connect
mongoose.connect("mongodb+srv://maheswari:123@cluster0.3edprap.mongodb.net/passkey?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("DB Connection Failed:", err));

const credential = mongoose.model("credential", {}, "bulkmail");

app.use(cors());
app.use(express.json());

app.post("/sendmail", async function (req, res) {
  try {
    const msg = req.body.msg;
    const emaillist = req.body.emaillist;

    // fetch credentials from DB
    const data = await credential.find();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: data[0].toJSON().user,   // Gmail ID from DB
        pass: data[0].toJSON().pass,   // 16-char app password from DB
      },
    });

    transporter.verify(function (error, success) {
      if (error) {
        console.log("SMTP Connection error:", error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });

    for (let i = 0; i < emaillist.length; i++) {
      await transporter.sendMail({
        from: data[0].toJSON().user,
        to: emaillist[i],
        subject: "A message from Bulk Mail App",
        text: msg,
      });

      console.log("Email sent to: " + emaillist[i]);
    }

    res.send(true);
  } catch (error) {
    console.error("Error sending mail:", error);
    res.send(false);
  }
});

app.listen(5000, function () {
  console.log("Server Started....");
});
