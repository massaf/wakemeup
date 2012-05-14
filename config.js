var config = {};

config.port     = 3001;
config.address  = "192.168.178.89";
config.wol_path = "/usr/sbin/arp";
config.wol_args = "-W";
config.use_sudo = true;

module.exports = config;
