import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import routesReducer from './routes_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  routes: routesReducer,
});

export default entitiesReducer;
