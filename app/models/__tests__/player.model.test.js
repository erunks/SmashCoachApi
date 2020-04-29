const { Player } = require('../index.model.js');

describe('Player', () => {
  describe('constructor', () => {
    it('creates a new player', () => {
      const name = 'Player';
      const player = new Player({ name });

      expect(player.name).toEqual(name);
    });

    describe('when the required parameters are missing', () => {
      it('should raise an error', () => {
        expect(() => { Player(); }).toThrow();
      });
    });
  });
});
