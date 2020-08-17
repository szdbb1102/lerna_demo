const fs = require('fs')
const novelPath = './novel.txt'
const argv = process.argv.slice(2)
let str = ''
let cur = ''
try {
  cur = fs.readFileSync(novelPath)
  str = cur.toString()
} catch (error) {
  fs.writeFileSync(novelPath, str)
}
if (argv.length) {
  switch (argv[0]) {
    case 'add':
      if (argv[1]) {
        fs.writeFileSync(novelPath, str + argv[1])
      } else {
        console.log('请输入文本')
      }
      break;
    case 'rm':
      fs.writeFileSync(novelPath, '')
      console.log('已清空')
      break;
    case 'w':
      console.log(str)
      break;
    default:
      console.log('支持选项： w 、rm或者 add')
      break;
  }
} else {
  console.log('支持选项： w 、rm或者 add')
}