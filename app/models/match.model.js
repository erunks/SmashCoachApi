const BaseModel = require('./base.model.js');

module.exports = (sql) => {
  // constructor
  const Match = class extends BaseModel {
    constructor(...args) {
      const defaults = {
        stocks_taken_by_player_one: 0,
        stage_chosen_by_player_one: false,
        stocks_taken_by_player_two: 0,
        stage_chosen_by_player_two: false,
        tournament_match: false
      };

      super({ ...Object.assign(defaults, ...args) });
    }
  };

  Match.create = (newMatch, result) => {
    sql.query(`INSERT matches SET ${newMatch.sqlString()}`,
      newMatch.definedValues(),
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(err, null);
          return;
        }

        console.log('created customer: ', { id: res.insertId, ...newMatch });
        result(null, { id: res.insertId, ...newMatch });
      });
  };

  Match.findById = (matchId, result) => {
    sql.query(`SELECT * FROM matches WHERE id = ${matchId}`, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log('found match: ', res[0]);
        result(null, res[0]);
        return;
      }

      // not found Match with the id
      result({ kind: 'not_found' }, null);
    });
  };

  Match.getAll = (result) => {
    sql.query('SELECT * FROM matches', (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      console.log('matches: ', res);
      result(null, res);
    });
  };

  Match.updateById = (id, match, result) => {
    sql.query(
      `UPDATE matches SET ${match.sqlString()} WHERE id = ?`,
      [...match.definedValues(), id],
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(null, err);
          return;
        }

        if (res.affectedRows === 0) {
          // not found Match with the id
          result({ kind: 'not_found' }, null);
          return;
        }

        console.log('updated match: ', { id, ...match });
        result(null, { id, ...match });
      }
    );
  };

  Match.remove = (matchId, result) => {
    sql.query('DELETE FROM matches WHERE id = ?', matchId, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      if (res.affectedRows === 0) {
        // not found Match with the id
        result({ kind: 'not_found' }, null);
        return;
      }

      console.log('deleted match with id: ', matchId);
      result(null, res);
    });
  };

  return Match;
};
