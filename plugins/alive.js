const { cmd } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const config = require('../settings');

// Fake quoted contact
const qMessage = {
  key: {
    fromMe: false,
    remoteJid: "status@broadcast",
    participant: "0@s.whatsapp.net",
  },
  message: {
    contactMessage: {
      displayName: "SASA X MD",
      vcard: `BEGIN:VCARD
VERSION:3.0
FN:SASANKA
TEL:+94784167385
END:VCARD`
    }
  }
};

// RAM Bar Generator
function generateRamBar(used, total, length = 10) {
  const percent = used / total;
  const filledLength = Math.round(length * percent);
  return "█".repeat(filledLength) + "░".repeat(length - filledLength);
}

// ALIVE COMMAND
cmd({
  pattern: "alive",
  alias: ["status","online"],
  desc: "Check bot status",
  category: "main",
  react: "🐍",
  filename: __filename
}, async (conn, mek, m, { from }) => {
  try {
    const now = new Date();
    const time = now.toLocaleTimeString("en-US", {
      timeZone: "Asia/Colombo",
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

    const emojiMap = {
      "➀": "𝟬", "➀": "𝟭➀", "➁": "𝟮", "➂": "𝟯",
      "➃": "𝟰", "➄": "𝟱", "➅": "𝟲", "➆": "𝟳",
      "➇": "𝟴", "➈": "𝟵", ":": ":", "𝗔": "𝗔",
      "𝗣": "𝗣", "𝗠": "𝗠", " ": " "
    };
    const toEmoji = str => str.split("").map(c => emojiMap[c] || c).join("");
    const emojiTime = toEmoji(time);

    const totalRam = (os.totalmem() / 1024 / 1024).toFixed(0);
    const usedRam = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(0);
    const ramBar = generateRamBar(+usedRam, +totalRam);

    const ramInfo = `💾 RAM: [${ramBar}] ${usedRam}/${totalRam}MB`;

    const hour = parseInt(now.toLocaleString("en-US", {
      hour: "2-digit", hour12: false, timeZone: "Asia/Colombo"
    }));
    let greeting = "Hello!";
    if (hour >= 5 && hour < 12) greeting = "🌞 Good Morning!";
    else if (hour >= 12 && hour < 17) greeting = "☀️ Good Afternoon!";
    else if (hour >= 17 && hour < 20) greeting = "🌇 Good Evening!";
    else greeting = "🌙 Good Night!";

    const status = `
*🐍 𝐒𝐀𝐒𝐀 𝐗 𝐌𝐃 𝐁𝐎𝐓 𝐀𝐋𝐈𝐕𝐄 𝐍𝐎𝐖 🐍*
*╭──────────●●►*
*│👋* ${greeting}
*│⚡ Status:* Online
*│🥷 Owner:* Sasanka Chamuth Fdo
*│📱 Owner Nb:* +94784167385
*│👀 Owner Age:* 16
*│☘️ Mode:* ${config.MODE === "Public" ? "🌍 Public" : "🔐 Private"}
*│⌚ Time:* ${emojiTime}
*│⏱️ Uptime:* ${runtime(process.uptime())}
${ramInfo}
*│💻 Host:* ${os.hostname()}
*╰──────────●●►*

> *𝐒𝐀𝐒𝐀 𝐗 𝐌𝐃 *`;

    // Fixed image and video (optional)
    const imageUrl = 'https://i.ibb.co/DPd51BK7/2c47d62ecc68.jpg';
    const videoUrl = 'https://files.catbox.moe/1qcic3.mp4';

    // Send PTV video (optional)
    await conn.sendMessage(from, {
      video: { url: videoUrl },
      mimetype: 'video/mp4',
      ptv: true
    }, { quoted: qMessage });

    // Send image with caption
    await conn.sendMessage(from, {
      image: { url: imageUrl },
      caption: status
    }, { quoted: qMessage });

  } catch (e) {
    console.error("Alive Error:", e);
    m.reply("❌ Alive command error:\n" + e.message);
  }
});
