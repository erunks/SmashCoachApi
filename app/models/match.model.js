module.exports = (sql) => {
  //constructor
  const Match = class {
    constructor (match) {
      this.stage_id = match.stage_id;
      this.player_one_id = match.player_one_id;
      this.fighter_one_id = match.fighter_one_id;
      this.stocks_taken_by_player_one = match.stocks_taken_by_player_one;
      this.stage_chosen_by_player_one = match.stage_chosen_by_player_one || false;
      this.player_two_id = match.player_two_id;
      this.fighter_two_id = match.fighter_two_id;
      this.stocks_taken_by_player_two = match.stocks_taken_by_player_two;
      this.stage_chosen_by_player_two = match.stage_chosen_by_player_two || false;
      this.tournament_match = match.tournament_match || false;
    }
  };

  Match.create = (newMatch, result) => {
    sql.query("INSERT INTO matches SET ?", newMatch, (err, res) => {
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
