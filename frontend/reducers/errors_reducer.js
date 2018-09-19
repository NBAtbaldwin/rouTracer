import { combineReducers } from 'redux';
import sessionErrorsReducer from './session_errors_reducer';
import routeErrorsReducer from './route_errors_reducer';
import activityErrorsReducer from './activity_errors_reducer';

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  route: routeErrorsReducer,
  activity: activityErrorsReducer,
});

export default errorsReducer;
