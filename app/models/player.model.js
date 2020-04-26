const BaseModel = require('./base.model.js');

module.exports = (sql) => {
  //constructor
  const Player = class extends BaseModel {
    constructor (player) {
      super();
      this.name = player.name;
    }
  };

  Player.create = (newPlayer, result) => {
    sql.query(`INSERT players SET ${newPlayer.sqlString()}`,
    newPlayer.definedValues(),
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created customer: ", { id: res.insertId, ...newPlayer });
      result(null, { id: res.insertId, ...newPlayer });
    });
  };

  Player.findById = (playerId, result) => {
    sql.query(`SELECT * FROM players WHERE id = ${playerId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found player: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Player with the id
      result({ kind: "not_found" }, null);
    });
  };

  Player.getAll = result => {
    sql.query("SELECT * FROM players", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("players: ", res);
      result(null, res);
    });
  };

  Player.updateById = (id, player, result) => {
    sql.query(
      `UPDATE players SET ${player.sqlString()} WHERE id = ?`,
      [...player.definedValues(), id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          // not found Player with the id
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("updated player: ", { id: id, ...player });
        result(null, { id: id, ...player });
      }
    );
  };

  Player.remove = (playerId, result) => {
    sql.query("DELETE FROM players WHERE id = ?", playerId, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Player with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted player with id: ", playerId);
      result(null, res);
    });
  };

  return Player;
};
