import { combineReducers } from 'redux';
import { Reducers } from './Reducers';
import { LocationReducer } from './LocationReducer';
import { CompaniesReducer } from './CompaniesReducer';
import { ProjectsReducer } from './ProjectsReducer';

const rootReducer = combineReducers({
  Index: Reducers,
  Location: LocationReducer,
  CompaniesData: CompaniesReducer,
  Projects: ProjectsReducer
});

export default rootReducer;
