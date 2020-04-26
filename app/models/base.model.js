const BaseModel = class {
  definedKeys() {
    return Object.getOwnPropertyNames(this).map((e) => {
      if (!!this[e]) {
        return e
      }
    }).filter(e => !!e);
  };

  definedValues() {
    return this.definedKeys().map(e => this[e]);
  };

  sqlString() {
    const definedKeys = this.definedKeys();

    let sql;
    if (definedKeys.length === 1) {
      sql = `${definedKeys[0]}`;
    } else {
      sql = `${definedKeys.join(" = ?, ")}`;
    }

    return `${sql} = ?`;
  };
};

module.exports = BaseModel;