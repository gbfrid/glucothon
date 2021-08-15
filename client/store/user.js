import axios from 'axios';


// ACTION TYPES
const SET_USER = 'SET_USER';


// ACTION CREATORS
export const _setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

// THUNKS
export const setUser = (user) => {

  return async (dispatch) => {
    try {
      dispatch(_setUser(user));
    } catch (error) {
      console.log(error)
    }

  };
};


// REDUCER
export default function (state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
}
