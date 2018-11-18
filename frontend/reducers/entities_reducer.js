import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import routesReducer from './routes_reducer';
import activitiesReducer from './activities_reducer';
import commentsReducer from './comments_reducer';
import likesReducer from './likes_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  routes: routesReducer,
  activities: activitiesReducer,
  comments: commentsReducer,
  likes: likesReducer,
});

export default entitiesReducer;
