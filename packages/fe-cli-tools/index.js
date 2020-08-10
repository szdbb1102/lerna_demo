const fs = require('fs')
const path = require('path')
const { exec } = require("child_process");
const CMDS = {
  'win32': 'start',
  'linux': 'xdg-open',
  'darwin': 'open',
}
const OPEN = CMDS[process.platform] || 'start'
function open (url) {
  console.log(url, `${OPEN} ${url}`)
  exec(`${OPEN} ${url}`)
}
const INDEX = path.resolve(__dirname, 'index.html')
open(INDEX)