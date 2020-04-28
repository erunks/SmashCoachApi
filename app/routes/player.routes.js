const players = require('../controllers/player.controller.js');

module.exports = (app) => {
  // create a new Player
  app.post('/players', players.create);

  // get all Players
  app.get('/players', players.findAll);

  // get a Player by Id
  app.get('/players/:playerId', players.findOne);

  // update a Player with playerId
  app.put('/players/:playerId', players.update);

  // delete a Player with playerId
  app.delete('/players/:playerId', players.delete);
};
