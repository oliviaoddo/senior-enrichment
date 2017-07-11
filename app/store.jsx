import { createStore, applyMiddleware } from 'redux';
// import rootReducer, {GET_STUDENTS, GET_CAMPUSES} from './reducers';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import axios from "axios";

const initialState = {
  students: [],
  campuses: []
};

export const GET_STUDENTS = "GET_STUDENTS";
export const GET_CAMPUSES = "GET_CAMPUSES";


export function getStudents (students) {
  const action = { type: GET_STUDENTS, students };
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

export function getCampuses (campuses) {
  const action = { type: GET_CAMPUSES, campuses };
  return action;
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

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STUDENTS:
      return Object.assign({}, state, {students: action.students});
    case GET_CAMPUSES:
      return Object.assign({}, state, {campuses: action.campuses});
    default:
      return state;
  }
};


export default createStore(rootReducer, applyMiddleware(thunkMiddleware, createLogger()))
