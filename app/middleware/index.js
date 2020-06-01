const cors = require('./cors');
// const jwt = require('./jwt');

module.exports = (app) => {
  cors(app);
  // jwt(app);
};
