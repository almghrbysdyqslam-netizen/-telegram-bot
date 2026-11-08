// plugins/games.js - قسم الألعاب 👑 GEO_BOT
const handler = async (m, { conn }) => {
  let text = `╔══✦🎮✦══╗
  🎮 *قسم الألعاب* 👑
╚══✦🎮✦══╝

👑 *المطور:* المغربي الحاكم

🎮 *أوامر الألعاب:*
• .لعبة
• .اكس
• .حجر
• .ذكاء
• .تحدي

✦ اكتب أي أمر وجرب 👑
*" اللي باعنا خسر دلعنا.. والملك وصل 👑 "*`.trim();

  await conn.sendMessage(m.chat, { text, mentions: [m.sender] }, { quoted: m });
};

handler.help = ['ق1'];
handler.tags = ['games'];
handler.command = ['ق1', 'العاب', 'games'];
export default handler;
