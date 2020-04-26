module.exports = (app) => {
  require('./fighter.routes')(app);
  require('./match.routes')(app);
  require('./player.routes')(app);
  require('./stage.routes')(app);
};
