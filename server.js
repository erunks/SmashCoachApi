const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');

const port = process.env.PORT || 4000;
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// setup middleware
require('./app/middleware/index.js')(app);

// setup routes
require('./app/routes/index.routes.js')(app);

// set port, listen for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
