const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "eRICEIJZ#2_vDLpLXbm4zg78BX1xZIBcOW61dTTAyqBVp95WRjW8",
AUTO_RECORDING: process.env.AUTO_RECORDING || "true",
ANTI_BAD_WORD: process.env.ANTI_BAD_WORD || "true",
AUTO_REPLY: process.env.AUTO_REPLY || "true",
ALIVE_IMG: process.env.ALIVE_IMG || "https://i.ibb.co/kVjBW3Zy/68a11c74b907.jpg",
ALIVE_MSG: process.env.ALIVE_MSG || "HELLO SASA X MD IS ALIVE NOW 🐍"
};

