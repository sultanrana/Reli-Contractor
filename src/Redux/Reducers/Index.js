import { combineReducers } from 'redux';
import { Reducers } from './Reducers';
import { LocationReducer } from './LocationReducer';

const rootReducer = combineReducers({
  Index: Reducers,
  Location: LocationReducer,
});

export default rootReducer;
