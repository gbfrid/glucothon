import axios from 'axios';
import { application_key } from '../../config';
import { application_id } from '../../config';

// ACTION TYPES
const SET_ITEM = 'SET_ITEM';


// ACTION CREATORS
export const _setItem = (item) => {
  return {
    type: SET_ITEM,
    item,
  };
};

// THUNKS
export const setItem = (item) => {

  return async (dispatch) => {
    try {
      // const { data: item } = await axios.post(`https://trackapi.nutritionix.com/v2/search/item?food_name=${foodName}`,
      //   {
      //   headers: {
      //   "x-app-id": application_id,
      //   "x-app-key": application_key,
      //   },
      //   });
      // console.log(item)
      dispatch(_setItem(item));
    } catch (error) {
      console.log(error)
    }

  };
};


// REDUCER
export default function (state = {}, action) {
  switch (action.type) {
    case SET_ITEM:
      return action.item;
    default:
      return state;
  }
}
