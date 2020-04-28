const { Match } = require('../models/index.model.js');

// Create and Save a new Match
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  // Create a Match
  const match = new Match({ ...req.body });

  // Save Match in the database
  Match.create(match, (err, data) => {
    if (err) { res.status(500).send({
      message:
          err.message || 'Some error occurred while creating the Match.'
    }); }
    else res.send(data);
  });
};

// Retrieve all Matches from the database
exports.findAll = (_req, res) => {
  Match.getAll((err, data) => {
    if (err) { res.status(500).send({
      message:
          err.message || 'Some error occurred while retrieving matches.'
    }); }
    else res.send(data);
  });
};

// Find a single Match with a matchId
exports.findOne = (req, res) => {
  Match.findById(req.params.matchId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No Match found with id ${req.params.matchId}.`
        });
      } else {
        res.status(500).send({
          message: `Error retrieving Match with id ${req.params.matchId}`
        });
      }
    } else res.send(data);
  });
};

// Update a Match by matchId
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  Match.updateById(
    req.params.matchId,
    new Match(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `No Match found with id ${req.params.matchId}.`
          });
        } else {
          res.status(500).send({
            message: `Error updating Match with id ${req.params.matchId}`
          });
        }
      } else res.send(data);
    }
  );
};

// Delet a single Match by matchId
exports.delete = (req, res) => {
  Match.remove(req.params.matchId, (err, _data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No Match found with id ${req.params.matchId}.`
        });
      } else {
        res.status(500).send({
          message: `Could not delete Match with id ${req.params.matchId}`
        });
      }
    } else res.send({ message: 'Match was deleted successfully!' });
  });
};
