const StudentModel = require('../models/studentModel')
const StaffModel = require('../models/staffModel')
const Course = require('../models/courseModel')
const mongodb = require('mongodb')

const addNewStudent = async (req, res) => {
  const staff = await StaffModel.findById(req.body.id);
  const newStudent = new StudentModel({
    student:req.body.student,
    createBy: staff._id,
  });
  try {
    await newStudent.save();
    staff.students.push(newStudent);
    await staff.save();
    res
      .status(201)
      .json({ message: "create new student success", data: newStudent });
  } catch (error) {
    res.status(409).json({ message: "create new student filed", error: error });
  }
};

const getStudent = async (req, res) => {
  try {
    await StudentModel.find({}, (err, result) => {
      if (err) console.log(err);
      res.status(200).json({ massage: "get Student success!", data: result })

    });
  } catch (err) {
    res.status(500).json({ massage: "get Student field", error: err });
  }
};

const getStudentGradeById = async (req, res) => {
  try {
    StudentModel.findById(req.body.id, (error, result) => {
      if (error) throw error
      res.status(200).json({ massage: "get Student grades by id success!", data: result
    })

    })
  }
  catch (err) {
    res.status(500).json({ massage: "get Student grades by id faild", error: err });
  }
}
const addStudentTestById = async (req, res) => {
  try {
    StudentModel.updateOne({ _id:mongodb.ObjectID(req.body._id) }, { $push: { "tests": { name: req.body.name, grade: req.body.grade } } }, (error, result) => {
      if (error) throw error
      res.status(200).json({ massage: "add test to a student by name was a success", data: result.tests })

    })
  }
  catch (err) {
    res.status(500).json({ massage: "adding a test to the test array faild", error: err });
  }
}
const updateStudentTestById = async (req, res) => {
  try {
    StudentModel.updateOne({ _id:mongodb.ObjectID(req.params._id) , tests: { $elemMatch: { name:req.body.name} } }, { $set: { "tests.$.grade": req.body.grade } }, (error, result) => {
      if (error) throw error
      res.status(200).json({ massage: "updating a student test was a success", data: result.tests })

    })
  }
  catch (err) {
    res.status(500).json({ massage: "updating a student test faild", error: err });
  }
}
const deleteStudentTestById = async (req, res) => {
  try {
    StudentModel.updateOne({ _id:mongodb.ObjectID(req.params._id) }, { $pull: { tests: { _id:mongodb.ObjectID(req.body._id) } } }, (error, result) => {
      if (error) throw error
      res.status(200).json({ massage: "deleting a student test was a success", data: result.tests })

    })
  }
  catch (err) {
    res.status(500).json({ massage: "deleting a student test faild", error: err });
  }
}

module.exports = {
  addNewStudent,
  getStudent,
  getStudentGradeById,
  addStudentTestById,
  updateStudentTestById,
  deleteStudentTestById
};
