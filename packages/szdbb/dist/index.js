'use strict';

module.exports = getInfo;

const execSync = require("child_process").execSync; //同步子进程
const breakLine = new Array(80).join("*");
const os = require("os");

function formatDate(value) {
  let fmt = "yyyy-MM-dd hh:mm:ss";
  let date = new Date(value);
  let o = {
    "M+": date.getMonth() + 1, // 月份
    "d+": date.getDate(), // 日
    "h+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
}
function fetchVersionInfo(obj) {
  let str = "";
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      str += `${key}:${obj[key]}\n`;
    }
  }
  str += `${breakLine}\n`;
  return str;
}

function getInfo() {
  const branch = execSync("git branch")
    .toString()
    .split("\n")
    .filter((v) => v.startsWith("*"))[0]
    .slice(1);
  const commit = execSync("git show -s --format=%H").toString().trim(); //当前提交的版本号
  let name = execSync("git show -s --format=%cn").toString().trim(); //姓名
  let email = execSync("git show -s --format=%ce").toString().trim(); //邮箱
  let date = formatDate(execSync("git show -s --format=%cd").toString()); //日期
  let message = execSync("git show -s --format=%s").toString().trim(); //提交说明
  const baseInfos = {
    "base info": "",
    user: os.userInfo().username,
    "build date": formatDate(Date.now()),
  };
  const gitInfos = {
    "git info": "",
    branch,
    commit,
    "commit message": message,
    name,
    email,
    date,
  };
  return fetchVersionInfo(baseInfos) + fetchVersionInfo(gitInfos);
}
