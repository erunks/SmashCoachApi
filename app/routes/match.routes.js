module.exports = app => {
  const matches = require('../controllers/match.controller.js');

  // create a new Match
  app.post('/matches', matches.create);

  // get all Matches
  app.get('/matches', matches.findAll);

  // get a Match by Id
  app.get('/matches/:matchId', matches.findOne);

  // update a Stage with stageId
  app.put('/matches/:matchId', matches.update);

  // delete a Match with matchId
  app.delete('/matches/:matchId', matches.delete);
};
