// plugins/dev.js - أمر المطور 👑 GEO_BOT
const handler = async (m, { conn }) => {
  let text = `╔══✦👑✦══╗
  👑 *المطور* 👑
╚══✦👑✦══╝

👑 *المغربي الحاكم*
💎 *مطور GEO_BOT*

📞 *تواصل معه:*
wa.me/201040678110

✨ *بوت حلو بقى كده .. الملك وصل 👑*
*" اللي باعنا خسر دلعنا "*`.trim();

  await conn.sendMessage(m.chat, { text, mentions: [m.sender] }, { quoted: m });
};

handler.help = ['مطور'];
handler.tags = ['owner'];
handler.command = ['مطور', 'dev', 'المطور'];
export default handler;
