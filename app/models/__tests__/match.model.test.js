const { Match } = require('../index.model.js');

describe('Match', () => {
  describe('constructor', () => {
    it('creates a new match', () => {
      const args = {
        stage_id: 1,
        player_one_id: 1,
        fighter_one_id: 1,
        player_two_id: 2,
        fighter_two_id: 1,
        stocks_taken_by_player_one: 3,
        stage_chosen_by_player_one: true,
        stocks_taken_by_player_two: 2,
        stage_chosen_by_player_two: false,
        tournament_match: true
      };
      const match = new Match(args);

      expect(match.stage_id).toEqual(args.stage_id);
      expect(match.player_one_id).toEqual(args.player_one_id);
      expect(match.fighter_one_id).toEqual(args.fighter_one_id);
      expect(match.player_two_id).toEqual(args.player_two_id);
      expect(match.fighter_two_id).toEqual(args.fighter_two_id);
      expect(match.stocks_taken_by_player_one).toEqual(args.stocks_taken_by_player_one);
      expect(match.stage_chosen_by_player_one).toEqual(args.stage_chosen_by_player_one);
      expect(match.stocks_taken_by_player_two).toEqual(args.stocks_taken_by_player_two);
      expect(match.stage_chosen_by_player_two).toEqual(args.stage_chosen_by_player_two);
      expect(match.tournament_match).toEqual(args.tournament_match);
    });

    describe('when the required parameters are missing', () => {
      it('should raise an error', () => {
        expect(() => { Match(); }).toThrow();
      });
    });

    describe('when the optional parameters are not present', () => {
      it('creates a new match using the defaults', () => {
        const args = {
          stage_id: 1,
          player_one_id: 1,
          fighter_one_id: 1,
          player_two_id: 2,
          fighter_two_id: 1
        };
        const match = new Match(args);

        expect(match.stage_id).toEqual(args.stage_id);
        expect(match.player_one_id).toEqual(args.player_one_id);
        expect(match.fighter_one_id).toEqual(args.fighter_one_id);
        expect(match.player_two_id).toEqual(args.player_two_id);
        expect(match.fighter_two_id).toEqual(args.fighter_two_id);
        expect(match.stocks_taken_by_player_one).toEqual(0);
        expect(match.stage_chosen_by_player_one).toEqual(false);
        expect(match.stocks_taken_by_player_two).toEqual(0);
        expect(match.stage_chosen_by_player_two).toEqual(false);
        expect(match.tournament_match).toEqual(false);
      });
    });
  });
});
