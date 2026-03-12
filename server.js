require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Serve HTML files
app.use(express.static(path.join(__dirname)));

app.post("/send-message", async (req, res) => {

    console.log("Request received:", req.body);
    const { name, email, message } = req.body;

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    let mailOptions = {
        from: email,
        to: "infotex2026@gmail.com",
        subject: "New Contact Message From InfoteX Website",
        text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Failed to send message." });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
