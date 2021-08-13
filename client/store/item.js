import axios from 'axios';



// ACTION TYPES
const SET_ITEMS = 'SET_ITEMS';


// ACTION CREATORS
export const setItems = (item) => {
  return {
    type: SET_ITEMS,
    item,
  };
};

const application_id = '58168d60';

const application_key = '65a3322a4124fccabfce18b8b1ab7f8b';

const food = 'apple'

// THUNKS
export const fetchItems = (food) => {
  // const params = {
  //   api_key: 'p42NDXAu8L02EdMDNsKwnLcQOKYp1ZThq6IF8NsU',
  //   query: item,
  //   dataType: ["Survey (FNDDS)"],
  //   pageSize: 1
  // }
  // const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(params.query)}&pageSize=${encodeURIComponent(params.pageSize)}&api_key=${encodeURIComponent(params.api_key)}&dataType=${encodeURIComponent(params.dataType)}`

  // const api_url = `https://trackapi.nutritionix.com/v2/search/instant?query=${encodeURIComponent(food)}?x-app-id=${encodeURIComponent(application_id)}&x-app-key=${encodeURIComponent(application_key)}`
  return async (dispatch) => {
    try {
      const { data: items } = await axios.get(`https://trackapi.nutritionix.com/v2/search/instant?query=${food}&branded=false`,
        {
        headers: {
        "x-app-id": application_id,
        "x-app-key": application_key,
        },
        });
      // const item = {item: 'cheese'}
      dispatch(setItems(items));
    } catch (error) {
      console.log(error)
    }

  };
};


// REDUCER
export default function (state = [], action) {
  switch (action.type) {
    case SET_ITEMS:
      return action.item;
    default:
      return state;
  }
}
