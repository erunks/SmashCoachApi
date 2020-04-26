const BaseModel = require('./base.model.js');

module.exports = (sql) => {
  //constructor
  const Stage = class extends BaseModel{
    constructor({
      legal = false,
      dlc = false
    } = {}) {
      super({
        legal,
        dlc,
        ...arguments[0]
      });
    }
  };

  Stage.create = (newStage, result) => {
    sql.query(`INSERT stages SET ${newStage.sqlString()}`,
    newStage.definedValues(),
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created customer: ", { id: res.insertId, ...newStage });
      result(null, { id: res.insertId, ...newStage });
    });
  };

  Stage.findById = (stageId, result) => {
    sql.query(`SELECT * FROM stages WHERE id = ${stageId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found Stage: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Stage with the id
      result({ kind: "not_found" }, null);
    });
  };

  Stage.getAllLegal = result => {
    sql.query("SELECT * FROM stages WHERE legal = true", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("stages: ", res);
      result(null, res);
    });
  };

  Stage.getAll = result => {
    sql.query("SELECT * FROM stages", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("stages: ", res);
      result(null, res);
    });
  };

  Stage.updateById = (id, stage, result) => {
    sql.query(
      `UPDATE stages SET ${stage.sqlString()} WHERE id = ?`,
      [...stage.definedValues(), id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          // not found Stage with the id
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("updated stage: ", { id: id, ...stage });
        result(null, { id: id, ...stage });
      }
    );
  };

  return Stage;
};
