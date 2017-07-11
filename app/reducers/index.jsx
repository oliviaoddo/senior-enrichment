import { combineReducers } from 'redux'

const initialState = {
  students: [],
  campuses: []
};

export const GET_STUDENTS = "GET_STUDENTS";
export const GET_CAMPUSES = "GET_CAMPUSES";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STUDENTS:
      return Object.assign({}, state, {students: action.students});
    case GET_CAMPUSES:
      return Object.assign({}, state, {students: action.campuses});
    default:
      return state;
  }
};

export default rootReducer
