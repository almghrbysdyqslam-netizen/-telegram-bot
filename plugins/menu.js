// plugins/menu.js - GEO_BOT 👑
function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor((ms % 3600000) / 60000);
  let s = Math.floor((ms % 60000) / 1000);
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}
import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, prepareWAMessageMedia } = pkg;
const handler = async (m, { conn }) => {
  try {
    let rtotalreg = Object.keys(global.db.data.users || {}).length;
    let now = new Date();
    let week = now.toLocaleDateString('ar-EG', { weekday: 'long' });
    let time = now.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
    let uptime = clockString(process.uptime() * 1000);
    let user = global.db.data.users[m.sender] || {};
    let { role = "مبتدئ", level = 0 } = user;
    let mentionId = m.sender;
    await conn.sendMessage(m.chat, { react: { text: '👑', key: m.key } });
    const mediaPrepared = await prepareWAMessageMedia({ video: { url: 'https://files.catbox.moe/2bi3iw.mp4', gifPlayback: true, ptv: true } }, { upload: conn.waUploadToServer });
    const gojoText = `╔══✦👑✦══╗\n  👑 *GEO_BOT 🩸* 👑\n╚══✦👑✦══╝\n\n✦ أَهْلاً بِكَ يَا *@${mentionId.split('@')[0]}*\n❖──────────────────❖\n📅 *اليوم* ∙ ${week}\n📆 *التاريخ* ∙ ${time}\n⏱️ *وقت التشغيل* ∙ \`${uptime}\`\n❖──────────────────❖\n🎖️ *المستوى* ∙ ${level}\n👑 *الرتبة* ∙ ${role}\n👥 *المستخدمين* ∙ ${rtotalreg}\n❖──────────────────❖\n👑 *المطور:* المغربي الحاكم\n❖──────────────────❖\n*" اللي باعنا خسر دلعنا.. والملك وصل 👑 "*`.trim();
    const message = { viewOnceMessage: { message: { interactiveMessage: { header: { hasMediaAttachment: true, ...mediaPrepared }, body: { text: gojoText }, contextInfo: { mentionedJid: [mentionId] }, nativeFlowMessage: { buttons: [ { name: 'single_select', buttonParamsJson: JSON.stringify({ title: '📚 أقسام الأوامر', sections: [{ title: '👑 أقسام GEO_BOT', rows: [ { header: '🎮 الألعاب', title: 'قسم الألعاب', id: '.ق1' }, { header: '⚙️ المشرفين', title: 'قسم المشرفين', id: '.ق2' }, { header: '🧰 الأدوات', title: 'قسم الأدوات', id: '.ق3' }, { header: '⬇️ التحميل', title: 'قسم التحميل', id: '.ق4' }, { header: '🤖 الذكاء', title: 'قسم AI', id: '.ق6' }, { header: '😂 التسلية', title: 'قسم التسلية', id: '.ق7' }, { header: '🕌 الدين', title: 'قسم الدين', id: '.ق8' }, { header: '🖼️ الصور', title: 'قسم الصور', id: '.ق11'} ] }] }) }, { name: 'cta_url', buttonParamsJson: JSON.stringify({ display_text: '📲 قناة المطور', url: 'https://whatsapp.com/channel/0029VbBilcVAO7RNV5OlOI0j' }) }, { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: '👑 تواصل مع المغربي الحاكم', id: '.تواصل' }) } ] } } } } } };
    const msg = generateWAMessageFromContent(m.chat, message, { userJid: m.sender });
    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
  } catch (err) {
    console.error('[ GEO_BOT ] خطأ في القائمة:', err);
    await conn.sendMessage(m.chat, { text: '⚠️ حدث خطأ أثناء تحميل القائمة!' }, { quoted: m });
  }
};
handler.help = ['menu', 'اوامر'];
handler.tags = ['main'];
handler.command = ['menu', 'اوامر', 'القائمة', 'قايمه'];
export default handler;
