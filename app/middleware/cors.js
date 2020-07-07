const cors = require('cors');

const env_allowlist = process.env.CORS_ALLOWLIST ? process.env.CORS_ALLOWLIST.split(',') : [];
const allowlist = ['http://localhost:3000'] + env_allowlist;
const corsOptions = {
  origin(origin, callback) {
    if (allowlist.indexOf(origin) !== -1) {
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
