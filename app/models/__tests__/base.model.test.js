const BaseModel = require('../base.model.js');

describe('BaseModel', () => {
  const requiredArgs = ['name'];

  describe('constructor', () => {
    it('assigns the key - values passed to the constructor to the model', () => {
      const name = 'BaseModel';
      const base = new BaseModel(requiredArgs, { name });

      expect(base.name).toEqual(name);
    });

    describe('when the required parameters are missing', () => {
      it('should raise an error', () => {
        expect(() => { new BaseModel(); }).toThrow();
      });

      it('should raise an error', () => {
        expect(() => { new BaseModel(requiredArgs, {}); }).toThrow();
      });

      it('should raise an error', () => {
        expect(() => { new BaseModel(requiredArgs, { id: 1 }); }).toThrow();
      });
    });
  });

  describe('#definedKeys', () => {
    it('returns the defined keys on the model', () => {
      const base = new BaseModel(
        requiredArgs, 
        {
          name: 'BaseModel',
          a: '1',
          boolean: true
        }
      );

      expect(base.definedKeys()).toEqual(['name', 'a', 'boolean']);
    });
  });

  describe('#definedValues', () => {
    it('returns the values of the defined keys on the model', () => {
      const base = new BaseModel(
        requiredArgs,
        {
          name: 'BaseModel',
          a: '1',
          boolean: true
        }
      );

      expect(base.definedValues()).toEqual(['BaseModel', '1', true]);
    });

    describe('when the keys are named `id` or `stocks`', () => {
      it('parses the string value as an int', () => {
        const base = new BaseModel(
          requiredArgs,
          {
            name: 'BaseModel',
            id: '1',
            stocks: '5'
          }
        );

        expect(base.definedValues()).toEqual(['BaseModel', 1, 5]);
      });
    });
  });

  describe('#sqlString', () => {
    it('returns the keys in a query string style', () => {
      const base = new BaseModel(
        requiredArgs,
        {
          name: 'BaseModel',
          id: '1',
          stocks: '5'
        }
      );

      expect(base.sqlString()).toEqual('name = ?, id = ?, stocks = ?');
    });
  });
});
