const BaseModel = class {
  constructor(source) {
    Object.assign(this, source);
  }

  definedKeys() {
    return Object.getOwnPropertyNames(this).map((e) => {
      if (!!this[e]) {
        return e
      }
    }).filter(e => !!e);
  };

  definedValues() {
    return this.definedKeys().map((e) => {
      if(!!e.match('id|stocks')){
        return parseInt(this[e]);
      } else {
        return this[e];
      }
    });
  };

  sqlString() {
    const definedKeys = this.definedKeys();

    let sql;
    if (definedKeys.length === 1) {
      sql = `${definedKeys[0]}`;
    } else {
      sql = `${definedKeys.join(' = ?, ')}`;
    }

    return `${sql} = ?`;
  };
};

module.exports = BaseModel;