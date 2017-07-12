import { createStore, applyMiddleware } from 'redux';
// import rootReducer, {GET_STUDENTS, GET_CAMPUSES} from './reducers';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import axios from "axios";

const initialState = {
  students: [],
  campuses: [],
  campus: {},
  student: {},
  newCampusEntry: ''
};

export const GET_STUDENTS = "GET_STUDENTS";
export const ADD_STUDENT = "ADD_STUDENT";
export const GET_STUDENT = "GET_STUDENT";
export const GET_CAMPUSES = "GET_CAMPUSES";
export const GET_CAMPUS = "GET_CAMPUS";
export const CHANGE_CAMPUS = "CHANGE_CAMPUS";
export const POST_CAMPUS = "POST_CAMPUS";


export function getStudents (students) {
  const action = { type: GET_STUDENTS, students };
  return action;
}

export function addStudent (student) {
  const action = { type: ADD_STUDENT, student };
  return action;
}


export function getStudent (student) {
  const action = { type: GET_STUDENT, student };
  return action;
}

export function getCampuses (campuses) {
  const action = { type: GET_CAMPUSES, campuses };
  return action;
}

export function getCampus (campus) {
  const action = { type: GET_CAMPUS, campus };
  return action;
}

export function changeCampus (campus) {
  const action = { type: CHANGE_CAMPUS, campus };
  return action;
}

export function newCampus (campus) {
  const action = { type: POST_CAMPUS, campus };
  return action;
}


export function fetchStudents () {

  return function thunk (dispatch) {
    return axios.get('/api/students')
      .then(res => res.data)
      .then(students => {
        const action = getStudents(students);
        dispatch(action);
      });
  }
}

export function postStudent (student) {
  console.log(student);
  return function thunk (dispatch) {
    return axios.post('/api/students', student)
      .then(res => res.data)
      .then(newStudent => {
        const action = addStudent(newStudent);
        dispatch(action);
        // socket.emit('new-channel', newChannel);
      });
  }

}


export function fetchCampuses () {

  return function thunk (dispatch) {
    return axios.get('/api/campuses')
      .then(res => res.data)
      .then(campuses => {
        const action = getCampuses(campuses);
        dispatch(action);
      });
  }
}

export function fetchCampus (campusID) {
  console.log(campusID);
  return function thunk (dispatch) {
    return axios.get(`/api/campuses/${campusID}`)
      .then(res => res.data)
      .then(campus => {
        const action = getCampus(campus);
        dispatch(action);
      });
  }
}


export function fetchStudent (studentID) {
  console.log(studentID);
  return function thunk (dispatch) {
    return axios.get(`/api/students/${studentID}`)
      .then(res => res.data)
      .then(student => {
        const action = getStudent(student);
        dispatch(action);
      });
  }
}

export function postCampus (campus) {
  console.log("the campus", campus);
  return function thunk (dispatch) {
    return axios.post('/api/campuses', campus)
      .then(res => res.data)
      .then(addedCampus => {
        const action = newCampus(addedCampus);
        dispatch(action);
        // socket.emit('new-channel', newChannel);
      });
  }

}

export function updateCampus (campus, campusID) {
  return function thunk (dispatch) {
    return axios.put(`/api/campuses/${campusID}`, campus)
      .then(res => res.data)
      .then(updatedCampus => {
        const action = getCampus(updatedCampus);
        dispatch(action);
        // socket.emit('new-channel', newChannel);
      });
  }

}

export function deleteCampus (campusID, history) {
  return function thunk (dispatch) {
    return axios.delete(`/api/campuses/${campusID}`)
      .then(() => {
        history.push('/campuses');
        // socket.emit('new-channel', newChannel);
      });
  }

}


const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STUDENTS:
      return Object.assign({}, state, {students: action.students});
    case GET_STUDENT:
      return Object.assign({}, state, {student: action.student})
    case GET_CAMPUSES:
      return Object.assign({}, state, {campuses: action.campuses});
    case GET_CAMPUS:
      return Object.assign({}, state, {campus: action.campus})
    case ADD_STUDENT:
      return Object.assign({}, state, { students: state.students.concat(action.student) });
    case CHANGE_CAMPUS:
      return Object.assign({}, state, {newCampusEntry: action.campus})
    case POST_CAMPUS:
      return Object.assign({}, state, { campuses: state.campuses.concat(action.campus) });
    default:
      return state;
  }
};


export default createStore(rootReducer, applyMiddleware(thunkMiddleware, createLogger()))
