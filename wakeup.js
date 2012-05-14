var util = require('util');
var exec = require('child_process').exec;

valid_host = function(host) {
  /* XXX: Do something...  */
  return true;
}

module.exports.wakeup = function(host) {
  /*
   * The use of sudo is dubious here, but the command is hardcoded
   * and arp(8) does sufficient checking on hostname/etheraddr before
   * doing any actions that require the elevated priviledges.
   */
  if (valid_host(host)) {
    var child = exec("sudo arp -W " + host, function (error, stdout, stderr) {
      if (stdout) {
        util.print('stdout: ' + stdout);
      }
      if (stderr) {
        util.print('stderr: ' + stderr);
      }
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
  } else {
    /* Do something, the passed host is not deemed valid. */
    console.log("Invalid hostname passed!");
  }
}
