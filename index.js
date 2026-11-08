// index.js - Hamilton 👑
import { makeWASocket, useMultiFileAuthState, DisconnectReason } from '@whiskeysockets/baileys';
import pino from 'pino';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pluginsDir = path.join(__dirname, 'إضافات');

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState('session');
  const sock = makeWASocket({ auth: state, logger: pino({ level: 'silent' }), printQRInTerminal: false });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', async (u) => {
    const { connection, lastDisconnect } = u;
    if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) start();
    }
    if (connection === 'open') console.log('Hamilton شغال 👑🔥');
  });

  // طلب كود الربط
  if (!state.creds.registered) {
    setTimeout(async () => {
      const num = '201040678110';
      const code = await sock.requestPairingCode(num);
      console.log('كود الربط بتاعك 👑:', code);
    }, 3000);
  }

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0];
    if (!m.message || m.key.fromMe) return;
    const text = m.message.conversation || m.message.extendedTextMessage?.text || '';
    const from = m.key.remoteJid;

    // تشغيل كل الإضافات
    if (fs.existsSync(pluginsDir)) {
      for (const file of fs.readdirSync(pluginsDir)) {
        if (!file.endsWith('.js')) continue;
        const plugin = await import(path.join(pluginsDir, file) + '?t=' + Date.now());
        if (plugin.default) await plugin.default(sock, m, text, from);
        if (plugin.handler) await plugin.handler(sock, m, text, from);
      }
    }
  });
}
start();
