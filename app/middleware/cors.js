const cors = require('cors');

module.exports = app => {
  // setting up pre-flight across all routes
  app.options('*', cors());

  // enabling CORS for all requests
  app.use(cors());
}