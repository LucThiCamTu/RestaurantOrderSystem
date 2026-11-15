
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Hiển thị giao diện Client
app.use(express.static(path.join(__dirname, "../../client")));

// API kiểm tra trạng thái hệ thống
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Restaurant Order System is running!",
        service: "Order API",
        status: "Healthy",
        timestamp: new Date()
    });
});

// Khởi động Server
app.listen(PORT, () => {
    console.log("================================");
    console.log("RESTAURANT ORDER SYSTEM");
    console.log("================================");
    console.log(`Server: http://localhost:${PORT}`);
    console.log(`Health API: http://localhost:${PORT}/api/health`);
    console.log("Status: Running");
});
