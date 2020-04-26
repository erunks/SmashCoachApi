const BaseModel = require('./base.model.js');

module.exports = (sql) => {
  //constructor
  const Match = class extends BaseModel {
    constructor (match) {
      super();
      this.stage_id = match.stage_id;
      this.match_one_id = match.match_one_id;
      this.fighter_one_id = match.fighter_one_id;
      this.stocks_taken_by_match_one = match.stocks_taken_by_match_one;
      this.stage_chosen_by_match_one = match.stage_chosen_by_match_one || false;
      this.match_two_id = match.match_two_id;
      this.fighter_two_id = match.fighter_two_id;
      this.stocks_taken_by_match_two = match.stocks_taken_by_match_two;
      this.stage_chosen_by_match_two = match.stage_chosen_by_match_two || false;
      this.tournament_match = match.tournament_match || false;
    }
  };

  Match.create = (newMatch, result) => {
    sql.query(`INSERT matches SET ${newMatch.sqlString()}`,
    newMatch.definedValues(),
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created customer: ", { id: res.insertId, ...newMatch });
      result(null, { id: res.insertId, ...newMatch });
    });
  };

  Match.findById = (matchId, result) => {
    sql.query(`SELECT * FROM matches WHERE id = ${matchId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found match: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Match with the id
      result({ kind: "not_found" }, null);
    });
  };

  Match.getAll = result => {
    sql.query("SELECT * FROM matches", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("matches: ", res);
      result(null, res);
    });
  };

  Match.updateById = (id, match, result) => {
    sql.query(
      `UPDATE matchs SET ${match.sqlString()} WHERE id = ?`,
      [...match.definedValues(), id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          // not found Match with the id
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("updated match: ", { id: id, ...match });
        result(null, { id: id, ...match });
      }
    );
  };

  Match.remove = (matchId, result) => {
    sql.query("DELETE FROM matches WHERE id = ?", matchId, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Match with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted match with id: ", matchId);
      result(null, res);
    });
  };

  return Match;
};
