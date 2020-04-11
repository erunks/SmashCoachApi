module.exports = app => {
  const players = require('../controllers/player.controller.js');

  // create a new Player
  app.post('/players', players.create);

  // get all Players
  app.get('/players', players.findAll);

  // get a Player by Id
  app.get('/players/:playerId', players.findOne);
};
