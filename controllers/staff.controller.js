const db = require("../models");
const Staff = db.staffs;

exports.createStaff = (req, res) => {
  // Validate request

  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const staffs = new Staff({
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    experience: req.body.experience,
  });
  staffs
    .save(staffs)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Staff.",
      });
    });
};

exports.getAll = (req, res) => {
  Staff.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Staffs.",
      });
    });
};

exports.updateStaff = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Staff.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Staff with id=${id}. Maybe Staff was not found!`,
        });
      } else res.send({ message: "Staff was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Staff with id=" + id,
      });
    });
};

exports.deleteStaff = (req, res) => {
  const id = req.params.id;

  Staff.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Staff with id=${id}. Maybe Staff was not found!`,
        });
      } else {
        res.send({
          message: "Staff was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Staff with id=" + id,
      });
    });
};
