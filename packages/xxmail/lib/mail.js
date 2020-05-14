const configPath = require("./paths");
const send = require("./app");
const fs = require("fs");
const fail = (error) => {
  console.log("failed",error);
  process.exit(1);
};

let configObj = {};

if (fs.existsSync(configPath)) {
  configObj = require(configPath);
} else {
  fail('未检测到mail.config.js');
}
try {
  var body = fs.readFileSync(configObj.file || "./1.md");
  configObj.body = body.toString();
  send(configObj);
} catch (error) {
  fail(error);
}
