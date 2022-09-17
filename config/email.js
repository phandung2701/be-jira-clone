module.exports.email = {
  service: "Gmail",
  auth: {
    user: process.env.ACCOUNT_SEND_EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  templateDir: "api/emailTemplates",

  testMode: false,
  ssl: false,
};
