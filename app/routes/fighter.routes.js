module.exports = app => {
  const fighters = require('../controllers/fighter.controller.js');

  // create a new Fighter
  app.post('/fighters', fighters.create);

  app.get('/fighters', (req,res) => {

    console.log(req.query);

    if(req.query.fighterName) {
      // get a Fighter like a Name
      fighters.findLike(req, res);
    } else {
      // get all Fighters
      fighters.findAll(req, res);
    }
  });

  // get a Fighter by Id
  app.get('/fighters/:fighterId', fighters.findOne);
};
