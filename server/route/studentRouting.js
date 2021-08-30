const express = require("express");
const router = express.Router();
const studentController = require("../controller/studentController");
const {authRole} = require('../controller/authentication/auth');

router.get('/', studentController.getStudent);
router.get('/gradesById', studentController.getStudentGradeById);
router.post('/addTestById', authRole("Staff"), studentController.addStudentTestById);
router.put('/updateTest/:_id', authRole("Staff"), studentController.updateStudentTestById);
router.delete('/deleteTest/:_id', authRole("Staff"), studentController.deleteStudentTestById);

module.exports = router;