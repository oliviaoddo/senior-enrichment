import axios from "axios";

const initialState = {
    currentUser: null
}

const SET = "SET";
const REMOVE = "REMOVE";


const removeUser = () => ({
   type: REMOVE
})

const setUser = user => ({
   type: SET, user
})


export const logUserIn = user => dispatch => {
    return axios.put('/api/auth/me', user)
      .then(res => res.data)
      .then(user => {
        dispatch(setUser(user));
      })
      .catch(error => console.log(error));
  }



export const logUserOut = () => dispatch => {
    return axios.delete(`/api/auth/me`)
      .then(res => res.data)
      .then(() => {
        dispatch(removeUser());
      })
      .catch(error => console.log(error));
  }


export const signUserUp = user => dispatch => {
    return axios.post('/api/auth/me', user)
      .then(res => res.data)
      .then(user => {
        dispatch(setUser(user));
      })
      .catch(error => console.log(error));
  }

export const retrieveLoggedInUser = () => dispatch => {
  axios.get('/api/auth/me')
  .then(res => dispatch(setUser(res.data)))
  .catch(err => console.error('Problem fetching current user', err));
};


export default function reducer (state = initialState, action){
  const newState = Object.assign({}, state);
  switch (action.type) {
      case SET:
         newState.currentUser = action.user;
         break;
      case REMOVE:
          newState.currentUser = null;
          break;
      default:
        return state;
    }

  return newState;
};
