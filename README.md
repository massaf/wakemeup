Wake Me Up
==========

Introduction
------------

This one-purpose web-app is designed with one goal in mind...to wake
up sleeping hosts on the network.
Using [Wake on Lan](en.wikipedia.org/wiki/Wake-on-LAN) those slacking
machines will be woken up, provided they support WoL and have it
enabled in their BIOS/PROM/etc).

Installation
------------

wakemeup can be installed using NPM with:

	npm install wakemup

Or you can clone/fork this repo.
and then run it (after configuring _config.js_):

	node app.js

ToDo
----

* Easier management of hosts/mac addresses (w/ sqlite)

Author
-----

Copyright (C) 2012 Jasper Lievisse Adriaanse <jasper@humppa.nl>

Distributed under the BSD license (see the file COPYING).
