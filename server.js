require('dotenv').config(); // Load variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios'); 

const app = express();
app.use(cors());
app.use(express.json());

// --- 1. CONFIG FROM .ENV ---
// Ab ye variables seedha .env file se connect hain
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN; 
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

// --- 2. MONGODB CONNECTION ---
mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected via Env!"))
    .catch(err => console.log("❌ Connection Error:", err));

const Contact = mongoose.model('Contact', new mongoose.Schema({
    name: String, 
    email: String, 
    message: String, 
    date: { type: Date, default: Date.now }
}));

// --- 3. API ROUTE ---
app.post('/api/contact', async (req, res) => {
    console.log("📩 Request received from Frontend...");
    try {
        const { name, email, message } = req.body;

        // Save to MongoDB
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        console.log("✅ Data saved to MongoDB");

        // Telegram Notification
        const telegramMessage = `🚀 New Portfolio Message!\n👤 Name: ${name}\n📧 Email: ${email}\n📝 Message: ${message}`;
        const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
        
        // Sending request to Telegram
        await axios.post(telegramUrl, {
            chat_id: TELEGRAM_CHAT_ID,
            text: telegramMessage
        });

        console.log("✅ Telegram notification sent!");
        res.status(201).json({ success: true, message: "Saved & Notified!" });

    } catch (err) {
        if (err.response) {
            console.log("❌ Telegram API Error:", err.response.data.description);
        } else {
            console.log("❌ Error:", err.message);
        }
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));


