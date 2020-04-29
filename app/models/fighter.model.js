const BaseModel = require('./base.model.js');

module.exports = (sql) => {
  // constructor
  const Fighter = class extends BaseModel {
    constructor(...args) {
      const requiredArgs = ['name'];
      const defaults = {
        dlc: false
      };

      super(requiredArgs, { ...Object.assign(defaults, ...args) });
    }
  };

  Fighter.create = (newFighter, result) => {
    sql.query(`INSERT fighters SET ${newFighter.sqlString()}`,
      newFighter.definedValues(),
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(err, null);
          return;
        }

        console.log('created customer: ', { id: res.insertId, ...newFighter });
        result(null, { id: res.insertId, ...newFighter });
      });
  };

  Fighter.findById = (fighterId, result) => {
    sql.query(`SELECT * FROM fighters WHERE id = ${fighterId}`, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log('found fighter: ', res[0]);
        result(null, res[0]);
        return;
      }

      // not found Fighter with the id
      result({ kind: 'not_found' }, null);
    });
  };

  Fighter.findLikeName = (fighterName, result) => {
    sql.query(`SELECT * FROM fighters WHERE name like '%${fighterName}%'`, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      console.log('fighters: ', res);
      result(null, res);
    });
  };

  Fighter.getAll = (result) => {
    sql.query('SELECT * FROM fighters', (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      console.log('fighters: ', res);
      result(null, res);
    });
  };

  Fighter.updateById = (id, fighter, result) => {
    sql.query(
      `UPDATE fighters SET ${fighter.sqlString()}`,
      [...fighter.definedValues(), id],
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(null, err);
          return;
        }

        if (res.affectedRows === 0) {
          // not found Fighter with the id
          result({ kind: 'not_found' }, null);
          return;
        }

        console.log('updated fighter: ', { id, ...fighter });
        result(null, { id, ...fighter });
      }
    );
  };

  return Fighter;
};
