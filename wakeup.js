var util   = require('util');
var exec   = require('child_process').exec;
var config = require('./config');

valid_host = function(host) {
  /* If the host contains a semi colon, we assume it's a mac address. */
  if (/:/.test(host)) {
    if (/^([0-9a-f]{2}([:-]|$)){6}$/i.test(host)) {
      return true;
    } else {
      return false;
    }
  } else {
    /* Not much more to validate, just return. */
    return true;
  }
}

module.exports.wakeup = function(host) {
  /*
   * The use of sudo is dubious here, but the command is hardcoded
   * and arp(8) does sufficient checking on hostname/etheraddr before
   * doing any actions that require the elevated priviledges.
   */
  if (valid_host(host)) {
    var command = util.format("%s %s %s %s", config.sudo, config.wol_path,
			  config.wol_args, host);

    var child = exec(command, function (error, stdout, stderr) {
      if (stdout) {
        return { "rc": 1,
                 "str": stdout };
      }
      if (stderr) {
        return { "rc": 2,
                 "str": stderr };
      }
      if (error !== null) {
        return { "rc": 3,
                 "str": error };
      }
    });
  } else {
    return { "rc": 4,
             "str": "Invalid hostname/mac address passed." };
  }

  return { "rc": 0,
           "str": null };
}
