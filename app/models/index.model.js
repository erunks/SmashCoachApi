const sql = require('../lib/db.js');

exports.Fighter = require('../models/fighter.model.js')(sql);
exports.Match = require('../models/match.model.js')(sql);
exports.Player = require('../models/player.model.js')(sql);
exports.Stage = require('../models/stage.model.js')(sql);