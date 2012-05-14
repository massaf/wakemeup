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
var wol    = require('wake_on_lan');
var config = require('./config');

var WakeUp = function(host) {
  /*
   * Allow the configuration options that wake_on_lan.js accepts to be set
   * in config.js so they can be passed on.
   */
  var options = {};
  options.address     = config.wol_address;
  options.num_packets = config.wol_num_packets;
  options.interval    = config.wol_interval;
  options.port        = config.wol_port;

  try {
    wol.wake(host, options);
  } catch (err) {
    return { "rc": 1, "str": err };
  }

  return { "rc": 0, "str": null };
}

module.exports.WakeUp = WakeUp;
