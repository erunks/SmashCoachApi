const { Stage } = require('../index.model.js');

describe('Stage', () => {
  describe('constructor', () => {
    it('creates a new stage', () => {
      const args = {
        name: 'Random',
        legal: true,
        dlc: true
      };
      const stage = new Stage(args);

      expect(stage.name).toEqual(args.name);
      expect(stage.legal).toEqual(args.legal);
      expect(stage.dlc).toEqual(args.dlc);
    });

    describe('when the required parameters are missing', () => {
      it('should raise an error', () => {
        expect(() => { Stage(); }).toThrow();
      });
    });

    describe('when the optional parameters are not present', () => {
      it('creates a new stage using the defaults', () => {
        const args = {
          name: 'Random'
        };
        const stage = new Stage(args);

        expect(stage.name).toEqual(args.name);
        expect(stage.legal).toEqual(false);
        expect(stage.dlc).toEqual(false);
      });
    });
  });
});
