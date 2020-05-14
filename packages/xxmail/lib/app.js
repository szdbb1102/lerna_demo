var nodemailer = require("nodemailer");
const fail = (error) => {
  console.log("failed",error);
  process.exit(1);
};
function sendEmail(config) {
  if(!config || !config.user||!config.pass||!config.title||!config.body){
    fail('配置不全')
  }
  var transporter = nodemailer.createTransport({
    host: "smtp.163.com", // 设置服务
    port: 25, // 端口
    // sercure: true, // 是否使用TLS，true，端口为465，否则其他或者568
    auth: {
      user: config.user,
      pass: config.pass, //授权码,通过QQ获取
    },
  });
  var mailOptions = {
    from: config.user, // 发送者
    to: config.user, // 接受者,可以同时发送多个,以逗号隔开
    subject: config.title, // 标题
    html: config.body,
    attachments: config.attachments,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      fail(err)
      return;
    }
    console.log("发送成功");
    process.exit(0)
  });
}
module.exports = sendEmail
