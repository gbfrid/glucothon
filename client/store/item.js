import axios from 'axios';



// ACTION TYPES
const SET_ITEM = 'SET_ITEM';


// ACTION CREATORS
export const setItem = (item) => {
  return {
    type: SET_ITEM,
    item,
  };
};


// THUNKS
export const fetchItem = (item) => {
  const params = {
    api_key: 'p42NDXAu8L02EdMDNsKwnLcQOKYp1ZThq6IF8NsU',
    query: item,
    dataType: ["Survey (FNDDS)"],
    pageSize: 1
  }
  const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(params.query)}&pageSize=${encodeURIComponent(params.pageSize)}&api_key=${encodeURIComponent(params.api_key)}&dataType=${encodeURIComponent(params.dataType)}`
  return async (dispatch) => {
    try {
      const { data: item } = await axios.get(api_url);
      // const item = {item: 'cheese'}
      dispatch(setItem(item));
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
