import { combineReducers } from 'redux';
import { Reducers } from './Reducers';
import { LocationReducer } from './LocationReducer';
import { CompaniesReducer } from './CompaniesReducer';

const rootReducer = combineReducers({
  Index: Reducers,
  Location: LocationReducer,
  CompaniesData: CompaniesReducer
});

export default rootReducer;
