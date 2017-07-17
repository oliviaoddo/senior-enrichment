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
const UPDATE_CAMPUS = "UPDATE_CAMPUS";
const DELETE_CAMPUS = "DELETE_CAMPUS";

/* -----------------    ACTION CREATORS    ------------------ */

const getCampuses = campuses => (
  { type: GET_CAMPUSES, campuses }
)

const getCampus = campus => ({
   type: GET_CAMPUS, campus
})

const newCampus = campus => (
  { type: POST_CAMPUS, campus }
)

const putCampus = campus => (
  { type: UPDATE_CAMPUS, campus }
)

const removeCampus = campus => (
  { type: DELETE_CAMPUS, campus }
)

/* -----------------    THUNK CREATORS     ------------------ */

export const fetchCampuses = () => dispatch => {
    return axios.get('/api/campuses')
      .then(res => res.data)
      .then(campuses => {
        const action = getCampuses(campuses);
        dispatch(action);
      })
      .catch(error => console.log(error));
  }



export const fetchCampus = campusID => dispatch => {
    return axios.get(`/api/campuses/${campusID}`)
      .then(res => res.data)
      .then(campus => {
        const action = getCampus(campus);
        dispatch(action);
      });
  }



export const postCampus = campus => dispatch => {
    return axios.post('/api/campuses', campus)
      .then(res => res.data)
      .then(addedCampus => {
        const action = newCampus(addedCampus);
        dispatch(action);
      })
      .catch(error => console.log(error));
  }



export const updateCampus = (campus, campusID) => dispatch => {
    return axios.put(`/api/campuses/${campusID}`, campus)
      .then(res => res.data)
      .then(updatedCampus => {
        const action = putCampus(updatedCampus);
        dispatch(action);
      });
}


export const deleteCampus = (campusId, history) => dispatch => {
    return axios.delete(`/api/campuses/${campusId}`)
      .then(res => res.data)
      .then(deletedCampus => {
        console.log("DELETED CAMPUS", deletedCampus);
        const action = removeCampus(deletedCampus);
        dispatch(action);
        history.push('/campuses');
        // const campusesThunk = fetchCampuses();
        // dispatch(campusesThunk);
      });

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
      case UPDATE_CAMPUS:
        newState.campuses = newState.campuses.map(campus => {
          if(campus.id === action.campus.id) return action.campus
          else return campus
        })
        newState.campus = action.campus;
        break;
      case DELETE_CAMPUS:
        newState.campuses = newState.campuses.filter(campus => {
          if(campus.id !== action.campus.id) return campus;
        })
        break;
      default:
        return state;
    }

  return newState;
};
