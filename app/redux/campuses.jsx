import axios from "axios";

/* -----------------    STATE     ------------------ */

const initialState = {
  campuses: [],
  campus: {}
}
/* -----------------    ACTIONS     ------------------ */



const GET_CAMPUSES = "GET_CAMPUSES";
const GET_CAMPUS = "GET_CAMPUS";
const POST_CAMPUS = "POST_CAMPUS";

/* -----------------    ACTION CREATORS    ------------------ */

function getCampuses (campuses) {
  const action = { type: GET_CAMPUSES, campuses };
  return action;
}

function getCampus (campus) {
  const action = { type: GET_CAMPUS, campus };
  return action;
}

function newCampus (campus) {
  const action = { type: POST_CAMPUS, campus };
  return action;
}

/* -----------------    THUNK CREATORS     ------------------ */

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
  console.log("updated campus in the thunk", campus)
  return function thunk (dispatch) {
    return axios.put(`/api/campuses/${campusID}`, campus)
      .then(res => res.data)
      .then(updatedCampus => {
        // dispatch(fetchStudents());
        const action = getCampus(updatedCampus);
        dispatch(action);
        // socket.emit('new-channel', newChannel);
      });
  }

}


export function deleteCampus (campusId, history) {
  return function thunk (dispatch) {
    return axios.delete(`/api/campuses/${campusId}`)
      .then(() => {
        const campusesThunk = fetchCampuses();
        dispatch(campusesThunk);
        history.push('/campuses');
        // socket.emit('new-channel', newChannel);
      });
  }

}

/* -----------------    Reducer     ------------------ */

export default function reducer (state = initialState, action){
  const newState = Object.assign({}, state);
  switch (action.type) {
      case GET_CAMPUSES:
         newState.campuses = action.campuses;
         break;
      case GET_CAMPUS:
          newState.campus = action.campus;
          break;
      case POST_CAMPUS:
        newState.campuses = [...newState.campuses, action.campus];
        break;
      default:
        return state;
    }

  return newState;
};
