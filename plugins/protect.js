// plugins/protect.js - قسم الحماية 🛡️ GEO_BOT
const handler = async (m, { conn }) => {
  let text = `╔══✦🛡️✦══╗
  🛡️ *قسم الحماية* 👑
╚══✦🛡️✦══╝

👑 *المطور:* المغربي الحاكم

🛡️ *أوامر الحماية:*
- .قفل
- .فتح
- .طرد
- .حظر
- .انذار

✦ الجروب في أمان مع الملك 👑
*" اللي باعنا خسر دلعنا.. والملك وصل 👑 "*`.trim();

  await conn.sendMessage(m.chat, { text, mentions: [m.sender] }, { quoted: m });
};

handler.help = ['ق2'];
handler.tags = ['protect'];
handler.command = ['ق2', 'حماية', 'protect'];
export default handler;
