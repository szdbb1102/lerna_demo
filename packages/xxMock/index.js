const path = require('path');
const fs = require('fs');
const Koa = require("koa");
const app = new Koa();
const Mock = require("mockjs");

const currentDir = fs.realpathSync(process.cwd());
const paras = process.argv.slice(2)
let [port=3333,mockDir='file'] = paras

app.use(async ctx => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Methods", "*");
  ctx.set("Access-Control-Allow-Headers", "*");
  let { url } = ctx;
  url = url.split("?")[0];
  const paths = path.join(currentDir, `${mockDir}/${url}.json`);
  let data = [];
  try {
    data = fs.readFileSync(paths);
    const res = Mock.mock(JSON.parse(data.toString()));
    ctx.body = res;
  } catch (error) {
    ctx.body = {
      code: "00000000x",
      message: "访问的目录不存在",
      success:"false",
      data: [],
      error
    };
  }
});
app.listen(port);
console.log(`mock-server:http://localhost:${port}`)