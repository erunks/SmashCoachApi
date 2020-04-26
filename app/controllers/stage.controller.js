const { Stage } = require("../models/index.model.js");

// Create and Save a new Stage
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Stage
  const stage = new Stage({...req.body});

  // Save Stage in the database
  Stage.create(stage, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Stage."
      });
    else res.send(data);
  });
};

// Retrieve all Stages from the database
exports.findAll = (_req, res) => {
  Stage.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving stages."
      });
    else res.send(data);
  });
};

// Retrieve all Legal Stages from the database
exports.findAllLegal = (req, res) => {
  Stage.getAllLegal((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving stages."
      });
    else res.send(data);
  });
};

// Find a single Stage with a stageId
exports.findOne = (req, res) => {
  Stage.findById(req.params.stageId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No Stage found with id ${req.params.stageId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Stage with id " + req.params.stageId
        });
      }
    } else res.send(data);
  });
};

// Update a Stage by stageId
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Stage.updateById(
    req.params.stageId,
    new Stage(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No Stage found with id ${req.params.stageId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Stage with id " + req.params.stageId
          });
        }
      } else res.send(data);
    }
  );
};
