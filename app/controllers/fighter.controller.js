const { Fighter } = require("../models/index.model.js");

// Create and Save a new Fighter
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Fighter
  const fighter = new Fighter({...req.body});

  // Save Fighter in the database
  Fighter.create(fighter, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Fighter."
      });
    else res.send(data);
  });
};

// Retrieve all Fighters from the database
exports.findAll = (_req, res) => {
  Fighter.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving fighters."
      });
    else res.send(data);
  });
};

// Find a single Fighter with a fighterId
exports.findOne = (req, res) => {
  Fighter.findById(req.params.fighterId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No Fighter found with id ${req.params.fighterId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Fighter with id " + req.params.fighterId
        });
      }
    } else res.send(data);
  });
};

// Find Fighters with names like fighterName
exports.findLike = (req, res) => {
  Fighter.findLikeName(escape(req.query.fighterName), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No Fighter(s) found with name like ${req.query.fighterName}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Fighter with id " + req.query.fighterName
        });
      }
    } else res.send(data);
  });
};

// Update a single Fighter by fighterId
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Fighter.updateById(
    req.params.fighterId,
    new Fighter(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No Fighter found with id ${req.params.fighterId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Fighter with id " + req.params.fighterId
          });
        }
      } else res.send(data);
    }
  );
};
