import { combineReducers } from 'redux';
import { Reducers } from './Reducers';
import { LocationReducer } from './LocationReducer';
import { CompaniesReducer } from './CompaniesReducer';
import { ProjectsReducer } from './ProjectsReducer';
import { TransactionsReducer } from './TransactionsReducer';
import { OptionsReducer } from './OptionsReducer';
import { StaffReducer } from './StaffReducer';

const rootReducer = combineReducers({
  Index: Reducers,
  Location: LocationReducer,
  CompaniesData: CompaniesReducer,
  Projects: ProjectsReducer,
  Transactions: TransactionsReducer,
  Options: OptionsReducer,
  Staff: StaffReducer
});

export default rootReducer;
