/*
 * Wake me Up, https://github.com/jasperla/wakemeup
 *
 * Copyright (C) 2012 Jasper Lievisse Adriaanse <jasper@humppa.nl>
 *
 * Permission to use, copy, modify, and distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

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
  }

  /* Otherwise there's little to validate. */
  return true;
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
             "str": "Invalid hostname/mac address passed: " + host };
  }

  return { "rc": 0,
           "str": null };
}
