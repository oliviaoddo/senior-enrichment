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
const DELETE_STUDENT = "DELETE_STUDENT";
const UPDATE_STUDENT = "UPDATE_STUDENT";


/* -----------------    ACTION CREATORS     ------------------ */

const  getStudents = students => ({ type: GET_STUDENTS, students});

const addStudent = student => ({ type: ADD_STUDENT, student });

const getStudent = student =>  ({ type: GET_STUDENT, student });

const putStudent = student =>  ({ type: UPDATE_STUDENT, student });

const removeStudent = student =>  ({ type: DELETE_STUDENT, student });


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
      case UPDATE_STUDENT:
        newState.students = newState.students.map(student => {
          if(student.id === action.student.id) return action.student
          else return student
        })
        newState.student = action.student;
        break;
      case DELETE_STUDENT:
        newState.students = newState.students.filter(student => {
          if(student.id !== action.student.id) return student;
        });
        break;
      default:
        return state;
    }

  return newState;
};



/* -----------------    THUNK CREATORS     ------------------ */

export const fetchStudents = () => dispatch => {
    return axios.get('/api/students')
      .then(res => res.data)
      .then(students => {
        const action = getStudents(students);
        dispatch(action);
      });
}

export const postStudent =  student => dispatch => {
    return axios.post('/api/students', student)
      .then(res => res.data)
      .then(newStudent => {
        const action = addStudent(newStudent);
        dispatch(action);
      });
}

export const fetchStudent = studentId  => dispatch => {
    return axios.get(`/api/students/${studentId}`)
      .then(res => res.data)
      .then(student => {
        const action = getStudent(student);
        dispatch(action);
      });
}


export const updateStudent =  (student, studentId) => dispatch => {
    return axios.put(`/api/students/${studentId}`, student)
      .then(res => res.data)
      .then(updatedStudent => {
        const action = putStudent(updatedStudent);
        dispatch(action);
      });
}

export const deleteStudent = (studentId, history) => dispatch => {
    return axios.delete(`/api/students/${studentId}`)
      .then(res => res.data)
      .then(deletedStudent => {
        const action = removeStudent(deletedStudent);
        dispatch(action);
        history.push('/students');
      });
}
