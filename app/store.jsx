import { createStore, applyMiddleware } from 'redux';
import rootReducer, {GET_STUDENTS, GET_CAMPUSES} from './reducers';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import axios from "axios";


export const loadStudents = () => {
  return dispatch => {
    axios.get("/api/students").then(response => {
      dispatch({ type: GET_STUDENTS, students: response.data });
    });
  }
};

export const loadCampuses = () => {
  return dispatch => {
    axios.get("/api/campuses").then(response => {
      dispatch({ type: GET_CAMPUSES, campuses: response.data });
    });
  }
};



export default createStore(rootReducer, applyMiddleware(thunkMiddleware, createLogger()))
