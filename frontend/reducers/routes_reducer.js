import { RECEIVE_ROUTE, DELETE_ROUTE, RECEIVE_ROUTES } from "./../actions/route_actions";
import { LOGOUT_CURRENT_USER } from './../actions/session_actions';
import { merge } from 'lodash';
import { RECEIVE_ACTIVITY, RECEIVE_ACTIVITIES } from "./../actions/activity_actions";

const routesReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ROUTES:
      return merge({}, action.routes);
    case RECEIVE_ROUTE:
      return merge({}, oldState, {[action.route.id]: action.route});
    case RECEIVE_ACTIVITIES:
      return merge({}, oldState, action.payload.route);
    case RECEIVE_ACTIVITY:
      return merge({}, oldState, action.payload.routes);
    case DELETE_ROUTE:
      let newState = merge({}, oldState);
      delete newState[action.routeId];
      return newState;
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return oldState;
  }
};

export default routesReducer;
