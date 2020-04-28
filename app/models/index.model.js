const sql = require('../lib/db.js');

exports.Fighter = require('./fighter.model.js')(sql);
exports.Match = require('./match.model.js')(sql);
exports.Player = require('./player.model.js')(sql);
exports.Stage = require('./stage.model.js')(sql);
