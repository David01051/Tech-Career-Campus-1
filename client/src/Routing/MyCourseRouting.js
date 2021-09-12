import React, { useEffect } from 'react'
import CourseSchedule from '../Components/Pages/CourseSchedule/CourseScheduleComponent';

import StudentGradesComponent from '../Components/Pages/Grades/StudentGradesComponent'
import AdminGradesComponent from '../Components/Pages/Grades/AdminGradesComponent'
import Syllabus from '../Components/Pages/Syllabus/SyllabusComponent'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { useDispatch, useSelector } from 'react-redux';
import Students from '../Components/Pages/Sudents/StudentsComponent';
import CreatCourse from '../Components/Pages/CreatCourse/CreatCourseComponent';
<<<<<<< HEAD
import StaffComponents from '../Components/Pages/Staff/StaffComponents';
=======
import { getCourses } from '../Redux/actions/coursesActions';
>>>>>>> 99add7ef50b8d22cefcf7d8666a2a7f376a79df4


const MyCourseRouting = () => {
    const dispatch = useDispatch()
    useEffect(() => dispatch(getCourses()), [])
    const {user} = useSelector(state => state.user);
    // const courses = useSelector(state => state.courses);
    return (
        <>
            <Tabs
                defaultActiveKey="home"
                transition={false}
                id="noanim-tab-example"
                className="mb-3"

            >
                {/* nice to have

                <Tab eventKey="daily-schedule" title="לוז יומי">
                    <DailySchedule />
                </Tab> */}
                <Tab eventKey="course-schedule" title="לוז קורס"  >
                    <CourseSchedule />
                </Tab>
                <Tab eventKey="syllabus" title="סילבוס" >
                    <Syllabus />
                </Tab>
                {
                    user.role === "Staff" ?
                        <Tab eventKey="Student-grades" title="ציוני סטודנטים" >
                            <AdminGradesComponent />
                        </Tab>
                        :
                        <Tab eventKey="grades" title="הציונים שלי" >
                            <StudentGradesComponent />
                        </Tab>
                }
                {
                    user.role === "Staff" ? <Tab eventKey="Students" title="סטודנטים" >
                        <Students />
                    </Tab> : ""
                }
                {
                    user.role === "Staff" ? <Tab eventKey="Creat-course" title="יצירת קורס" >
                        <CreatCourse />
                    </Tab> : ""
                }
<<<<<<< HEAD

{
                    user.role === "Staff" ? <Tab eventKey="staff" title="סגל" >
                        <StaffComponents />
                    </Tab> : ""
                }



=======
>>>>>>> 99add7ef50b8d22cefcf7d8666a2a7f376a79df4
            </Tabs>
            {/* {
                courses.map(course => <button>{course.name}</button>)
            } */}
        </>
    )
}
export default MyCourseRouting;