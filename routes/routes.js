
   
module.exports = app => {
    const staffs = require("../controllers/staff.controller.js");
    const courses = require("../controllers/course.controller.js");

    var router = require("express").Router();
  
    //satffs
    router.post("/createStaff", staffs.createStaff);
  
    router.get("/getAllStaffs", staffs.getAll);
  
    router.put("/updateStaff/:id", staffs.updateStaff);
  
    router.delete("/deleteStaff/:id", staffs.deleteStaff);
  
    //course
    router.post("/createCourse", courses.createCourse);
  
    router.get("/getAllCourses", courses.getAllCourses);
  
    router.put("/updateCourse/:id", courses.updateCourse);
  
    router.delete("/deleteCourse/:id", courses.deleteCourse);
  

    app.use("/api/v1", router);
  };