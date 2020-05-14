"use strict";
const inquirer = require("inquirer");
const { execSync } = require("child_process");

module.exports = cmt;

function cmt() {
  execSync("git add . ");
  inquirer
    .prompt([
      {
        name: "msg",
        message: `输入提交信息: `,
        validate: function (input) {
          const done = this.async();
          done(null, true);
        },
      },
    ])
    .then((v) => {
      let msg = v.msg || "nothing";
      execSync(`git commit -m ${msg}`);
      execSync(`git push origin master`);
    });
}
