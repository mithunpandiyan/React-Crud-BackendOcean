const { Schema } = require("mongoose");
const staffs=require('./staff.model')

module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        category:String,
        assignstaff:{
            type:Schema.Types.ObjectId,
            ref:"staffs"
        }
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Course = mongoose.model("courses", schema);
    return Course;
  };