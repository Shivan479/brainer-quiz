import {combineReducers} from 'redux';
import app from './app';

const reducers = {
  app,
};
const combinedReducer = combineReducers({...reducers});

const rootReducer = (state, action) => {
  if (action.type == 'QUIT') {
    state = undefined;
  }
  return combinedReducer(state, action);
};
export default rootReducer;
