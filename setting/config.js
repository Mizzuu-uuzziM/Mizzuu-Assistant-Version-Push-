const fs = require('fs')
//=========[GLOBAL INFO BOT]===========
global.owner = "62xxx"
global.ownername = ''
global.botname = 'Mizzuu • Assistant'
global.version = 'V 2.0.3 (PushVersion)'
global.thumbnail = ''
global.simbol = '★'
global.github = 'https://github.com/Mizzuu-uuzziM/mizzuu'

//=========[GLOBAL PUSHKONTAK]==========
global.delaypushkontak = '15000'

//=========[GLOBAL MESSAGE]===========
global.mess = {
  owner: "Owner Only",
  done: "```Success``` Bos",
  wait: "`Proccess` Bos",
  botadmin: "Gw Kan Bukan Admin Banh",
  admin: "Lu Bukan Admin",
  malas: "Dikabarkan Mizzuu Sedang Malas Buat Fitur"
}

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})

/* Base By Fernazer Code 
Recode By Mizzuu
*/

