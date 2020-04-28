const stages = require('../controllers/stage.controller.js');

module.exports = (app) => {
  // create a new Stage
  app.post('/stages', stages.create);

  // get all Stages
  app.get('/stages', (req, res) => {
    if (req.query.legal === 'true') {
      // get all Legal Stages
      stages.findAllLegal(req, res);
    } else {
      // get all Stages
      stages.findAll(req, res);
    }
  });

  // get a Stage by Id
  app.get('/stages/:stageId', stages.findOne);

  // update a Stage with stageId
  app.put('/stages/:stageId', stages.update);
};
