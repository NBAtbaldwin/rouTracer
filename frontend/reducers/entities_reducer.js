import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import routesReducer from './routes_reducer';
import activitiesReducer from './activities_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  routes: routesReducer,
  activities: activitiesReducer,
});

export default entitiesReducer;
