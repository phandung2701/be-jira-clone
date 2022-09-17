process.chdir(__dirname);

var sails;
var rc;
try {
  sails = require("sails");
  require("dotenv").config();
  rc = require("sails/accessible/rc");
} catch (err) {
  console.error(err.stack);

  return;
} //-•

// Start server
sails.lift(rc("sails"));
