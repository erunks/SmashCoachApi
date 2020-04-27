module.exports = app => {
  require('./cors.js')(app);
  require('./jwt.js')(app);
};
