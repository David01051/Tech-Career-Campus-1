import { GET_COURSES } from "../actions/types";

function coursesReducer(courses = [], action) {
    switch (action.type) {
        case GET_COURSES:
            return action.payload

        default:
            return courses;
    }
}

export default coursesReducer