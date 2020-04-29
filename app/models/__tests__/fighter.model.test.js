const { Fighter } = require('../index.model.js');

describe('Fighter', () => {
  describe('constructor', () => {
    it('creates a new fighter', () => {
      const args = {
        name: 'Random',
        dlc: true
      };
      const fighter = new Fighter(args);

      expect(fighter.name).toEqual(args.name);
      expect(fighter.dlc).toEqual(args.dlc);
    });

    describe('when the required parameters are missing', () => {
      it('should raise an error', () => {
        expect(() => { Fighter(); }).toThrow();
      });
    });

    describe('when the optional parameters are not present', () => {
      it('creates a new fighter using the defaults', () => {
        const args = {
          name: 'Random'
        };
        const fighter = new Fighter(args);

        expect(fighter.name).toEqual(args.name);
        expect(fighter.dlc).toEqual(false);
      });
    });
  });
});
