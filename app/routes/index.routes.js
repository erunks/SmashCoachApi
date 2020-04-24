module.exports = (app) => {
  require('./fighter.routes')(app);
  require('./player.routes')(app);
  require('./stage.routes')(app);
};
