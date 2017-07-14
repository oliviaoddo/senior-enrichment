import axios from 'axios';


/* -----------------    STATE     ------------------ */

const initialState = {
  students: [],
  student: {}
}


/* -----------------    ACTIONS     ------------------ */

const GET_STUDENTS = "GET_STUDENTS";
const ADD_STUDENT = "ADD_STUDENT";
const GET_STUDENT = "GET_STUDENT";


/* -----------------    ACTION CREATORS     ------------------ */

function getStudents (students) {
  const action = { type: GET_STUDENTS, students };
  return action;
}

function addStudent (student) {
  const action = { type: ADD_STUDENT, student };
  return action;
}


function getStudent (student) {
  const action = { type: GET_STUDENT, student };
  return action;
}

/* -----------------    REDUCER     ------------------ */


export default function reducer (state = initialState, action){
  const newState = Object.assign({}, state);
  switch (action.type) {
      case GET_STUDENTS:
         newState.students = action.students;
         break;
      case GET_STUDENT:
          newState.student = action.student;
          break;
      case ADD_STUDENT:
        newState.students = [...newState.students, action.student];
        break;
      default:
        return state;
    }

  return newState;
};



/* -----------------    THUNK CREATORS     ------------------ */

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


export function updateStudent (student, studentId) {
  return function thunk (dispatch) {
    return axios.put(`/api/students/${studentId}`, student)
      .then(res => res.data)
      .then(updatedStudent => {
        const action = getStudent(updatedStudent);
        dispatch(action);
        // socket.emit('new-channel', newChannel);
      });
  }

}

export function deleteStudent (studentId, history) {
  return function thunk (dispatch) {
    return axios.delete(`/api/students/${studentId}`)
      .then(() => {
        dispatch(fetchStudents());
        history.push('/students');
        // socket.emit('new-channel', newChannel);
      });
  }

}
