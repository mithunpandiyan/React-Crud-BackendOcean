const db = require("../models");
const Course = db.courses;
const staffs = db.staffs;

exports.createCourse = (req, res) => {
  ObjectID = require("mongodb").ObjectId;
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const courses = new Course({
    name: req.body.name,
    category:req.body.category,
    assignstaff: new ObjectID(req.body.assignstaff)
  });
  courses
    .save(courses)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
        console.log(err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Course."
      });
    });
};

exports.getAllCourses = (req, res) => {
  Course.aggregate([
    {'$match': { _id : {$exists: true} } },
    {
      $lookup: {
        from: "staffs",
        localField: "assignstaff",
        foreignField: "_id",
        as: "staffDetail"
      }
    },
    {$unwind: '$staffDetail'}
  ])
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Courses."
      });
    });
};

exports.updateCourse = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Course.findByIdAndUpdate(id, req.body)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Course with id=${id}. Maybe Course was not found!`
        });
      } else res.send({ message: "Course was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Course with id=" + id
      });
    });
};

exports.deleteCourse = (req, res) => {
  const id = req.params.id;

  Course.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Course with id=${id}. Maybe Course was not found!`
        });
      } else {
        res.send({
          message: "Course was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Course with id=" + id
      });
    });
};

