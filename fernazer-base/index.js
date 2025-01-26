
/* Fernazer Code Base */

console.clear();
console.log('Mulai...');
require('../setting/config');

const { 
    default: 
    makeWASocket, 
    useMultiFileAuthState, 
    DisconnectReason, 
    makeInMemoryStore,
    jidDecode, 
    downloadContentFromMessage
} = require("@whiskeysockets/baileys");

const pino = require('pino');
const readline = require("readline");
const fs = require('fs');

const {
    Boom 
} = require('@hapi/boom');

const {
    smsg,
    formatSize, 
    isUrl, 
    generateMessageTag,
    getBuffer,
    getSizeMedia, 
    runtime, 
    fetchJson, 
    sleep 
} = require('./lib/myfunction');

const usePairingCode = true;

const question = (text) => {
    const rl = readline.createInterface({ 
        input: process.stdin, output: process.stdout
    });
    return new Promise((resolve) => {
        rl.question(text, resolve)
    });
}

const store = makeInMemoryStore({
    logger: pino().child({
        level: 'silent',
        stream: 'store'
    })
});

async function clientstart() {
    const {
        state,
        saveCreds 
    } = await useMultiFileAuthState('./fernazersession');
    
    const client = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: !usePairingCode,
        auth: state,
        browser: ["Ubuntu", "Chrome", "20.0.04"]
    });

    if (usePairingCode && !client.authState.creds.registered) {
        const phoneNumber = await question('Isi Nomer Bot Awali Dengan 62:\n');
        const code = await client.requestPairingCode(phoneNumber.trim());
        console.log(`Code Pairing Nya: ${code}`);
    }

    store.bind(client.ev);
   
    client.ev.on('messages.upsert', async chatUpdate => {
       try {
	 let mek = chatUpdate.messages[0]
         if (!mek.message) return
	 mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
	 if (mek.key && mek.key.remoteJid === 'status@broadcast') return
         if (!client.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
	 let m = smsg(client, mek, store)
	 require("./basefernazer")(client, m, chatUpdate, mek, store)
       } catch (err) {
	 console.error(err);		
       }
    })

    client.decodeJid = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {};
            return decode.user && decode.server && decode.user + '@' + decode.server || jid;
        } else return jid;
    };

    client.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = client.decodeJid(contact.id);
            if (store && store.contacts) store.contacts[id] = { id, name: contact.notify };
        }
    });

    

    client.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
            console.log(lastDisconnect.error);
            if (lastDisconnect.error == 'Error: Stream Errored (unknown)') {
                process.exit();
            } else if (reason === DisconnectReason.badSession) {
                console.log(`Bad Session File, Please Delete Session and Scan Again`);
                process.exit();
            } else if (reason === DisconnectReason.connectionClosed) {
                console.log('Connection closed, reconnecting...');
                process.exit();
            } else if (reason === DisconnectReason.connectionLost) {
                console.log('Connection lost, trying to reconnect');
                process.exit();
            } else if (reason === DisconnectReason.connectionReplaced) {
                console.log('Connection Replaced, Another New Session Opened, Please Close Current Session First');
                client.logout();
            } else if (reason === DisconnectReason.loggedOut) {
                console.log(`Device Logged Out, Please Scan Again And Run.`);
                client.logout();
            } else if (reason === DisconnectReason.restartRequired) {
                console.log('Restart Required, Restarting...');
                await clientstart();
            } else if (reason === DisconnectReason.timedOut) {
                console.log('Connection TimedOut, Reconnecting...');
                clientstart();
            }
        } else if (connection === "connecting") {
            console.log('Menghubungkan . . . ');
        } else if (connection === "open") {
            console.log('Bot Berhasil Tersambung');
        }
    });

    client.sendText = (jid, text, quoted = '', options) => {
	    client.sendMessage(jid, { text: text, ...options }, { quoted });
    }
    
    client.downloadMediaMessage = async (message) => {
          let mime = (message.msg || message).mimetype || ''
          let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
          const stream = await downloadContentFromMessage(message, messageType)
          let buffer = Buffer.from([])
            for await(const chunk of stream) {
		buffer = Buffer.concat([buffer, chunk])}
	    return buffer
    } 
    
    client.ev.on('creds.update', saveCreds);
    return client;
}

clientstart();

let file = require.resolve(__filename);
require('fs').watchFile(file, () => {
    require('fs').unwatchFile(file);
    console.log('\x1b[0;32m' + __filename + ' \x1b[1;32mupdated!\x1b[0m');
    delete require.cache[file];
    require(file);
});
