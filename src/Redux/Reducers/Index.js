import { combineReducers } from 'redux';
import { UserSessionReducer } from './UserSessionReducer';

const rootReducer = combineReducers({
  session: UserSessionReducer
});

export default rootReducer;
