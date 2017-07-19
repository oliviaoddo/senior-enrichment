import { combineReducers } from 'redux';
import students from './students';
import campuses from './campuses';
import auth from './auth';

export default combineReducers({ students, campuses, auth });
