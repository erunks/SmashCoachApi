const { Player } = require('../models/index.model.js');

// Create and Save a new Player
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  // Create a Player
  const player = new Player({ ...req.body });

  // Save Player in the database
  Player.create(player, (err, data) => {
    if (err) { res.status(500).send({
      message:
          err.message || 'Some error occurred while creating the Player.'
    }); }
    else res.send(data);
  });
};

// Retrieve all Players from the database
exports.findAll = (_req, res) => {
  Player.getAll((err, data) => {
    if (err) { res.status(500).send({
      message:
          err.message || 'Some error occurred while retrieving players.'
    }); }
    else res.send(data);
  });
};

// Find a single Player with a playerId
exports.findOne = (req, res) => {
  Player.findById(req.params.playerId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No Player found with id ${req.params.playerId}.`
        });
      } else {
        res.status(500).send({
          message: `Error retrieving Player with id ${req.params.playerId}`
        });
      }
    } else res.send(data);
  });
};

// Update a single Player by playerId
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  Player.updateById(
    req.params.playerId,
    new Player(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `No Player found with id ${req.params.playerId}.`
          });
        } else {
          res.status(500).send({
            message: `Error updating Player with id ${req.params.playerId}`
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a single Player by playerId
exports.delete = (req, res) => {
  Player.remove(req.params.playerId, (err, _data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No Player found with id ${req.params.playerId}.`
        });
      } else {
        res.status(500).send({
          message: `Could not delete Player with id ${req.params.playerId}`
        });
      }
    } else res.send({ message: 'Player was deleted successfully!' });
  });
};
