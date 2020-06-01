const cors = require('cors');

const env_whitelist = process.env.CORS_WHITELIST.split(',') || [];
const whitelist = ['http://localhost:3000'] + env_whitelist;
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
};

module.exports = (app) => {
  // setting up pre-flight across all routes
  app.options('*', cors(corsOptions));

  // enabling CORS for all requests
  app.use(cors());
}
