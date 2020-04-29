const BaseModel = class {
  constructor(requiredArgs, ...args) {
    BaseModel._validateArguments(requiredArgs, args[0]);
    Object.assign(this, args[0]);
  }

  static _validateArguments(requiredArgs, receivedArgs) {
    const props = Object.getOwnPropertyNames(receivedArgs);
    if (props.length < requiredArgs.length) {
      throw new Error('Received arguments size is less than what was required');
    } else if (!requiredArgs.every((arg) => props.includes(arg))) {
      throw new Error('A required property is missing from what was received');
    }
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
