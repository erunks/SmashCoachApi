const BaseModel = class {
  constructor(...args) {
    Object.assign(this, ...args);
  }

  definedKeys() {
    return Object.getOwnPropertyNames(this)
      .map((e) => (this[e] ? e : null))
      .filter((e) => Boolean(e));
  }

  definedValues() {
    return this.definedKeys().map((e) => {
      if (e.match('id|stocks')) {
        return parseInt(this[e], 10);
      } else {
        return this[e];
      }
    });
  }

  sqlString() {
    const definedKeys = this.definedKeys();

    let sql;
    if (definedKeys.length === 1) {
      sql = `${definedKeys[0]}`;
    } else {
      sql = `${definedKeys.join(' = ?, ')}`;
    }

    return `${sql} = ?`;
  }
};

module.exports = BaseModel;
