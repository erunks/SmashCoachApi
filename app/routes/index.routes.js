const fighterRoutes = require('./fighter.routes');
const matchRoutes = require('./match.routes');
const playerRoutes = require('./player.routes');
const stageRoutes = require('./stage.routes');

module.exports = (app) => {
  fighterRoutes(app);
  matchRoutes(app);
  playerRoutes(app);
  stageRoutes(app);
};
