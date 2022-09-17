module.exports = {
  sendWelcomeMail: function (obj, otp) {
    sails.hooks.email.send(
      "welcomeEmail",
      {
        Name: obj.email.split("@")[0],
        OTP: otp,
      },
      {
        to: obj.email,
        subject: "Jira Clone",
      },
      function (err) {
        if (err) {
          console.log("Email not  send sucessfully-", err);
        } else {
          console.log("Email send sucessfully");
        }
      }
    );
  },
};
