import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import item from './items';
import items from './items'


const reducer = combineReducers({
  item,
  items
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware)
);
const store = createStore(reducer, middleware);

export default store;
