const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "alive",
    alias: ["status", "runtime", "uptime"],
    desc: "Check uptime and system status",
    category: "main",
    react: "🐍",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Generate system status message
        const status = `          
╭━━〔 *🐍 𝐒𝐀𝐒𝐀 𝐗 𝐌𝐃 🐍* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• *👋 ʜɪ*: ${pushname}
┃◈┃• *⏳ ᴜᴘᴛɪᴍᴇ*:  ${runtime(process.uptime())} 
┃◈┃• *📟 ʀᴀᴍ*: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
┃◈┃• *👨‍💻 ᴏᴡɴᴇʀ*: ᴍʀ.ꜱᴀꜱᴀɴᴋᴀ ᴄʜᴀᴍᴜᴛʜ ꜰᴅᴏ </>
┃◈└───────────┈⊷
╰──────────────┈⊷

*𝐒𝐀𝐒𝐀 𝐗 𝐌𝐃 𝐌𝐔𝐋𝐓𝐈 𝐃𝐄𝐕𝐈𝐂𝐄 𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏 𝐁𝐎𝐓 𝐂𝐑𝐄𝐀𝐓𝐄𝐃 𝐁𝐘 𝐌𝐑.𝐒𝐀𝐒𝐀𝐍𝐊𝐀 𝐂𝐇𝐀𝐌𝐔𝐓𝐇 😼🩸*

 *𝐅𝐎𝐋𝐋𝐎𝐖 𝐎𝐔𝐑 𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋𝐒 😊💓
     
*https://whatsapp.com/channel/0029VbCWZks7j6gFBZH8Fw42*

  
> *𝐏𝐎𝐖𝐄𝐑𝐃 𝐁𝐘 𝐒𝐀𝐒𝐀𝐍𝐊𝐀 𝐂𝐇𝐀𝐌𝐔𝐓𝐇 🐍*`;


        await conn.sendMessage(from, { 
            image: { url: `https://i.ibb.co/mCQb6Vf9/d0966e62ac8e.jpg` },  // Image URL
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363395674230271@newsletter',
                    newsletterName: 'SASA-X-MD',
                    serverMessageId: 190
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in alive command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});



