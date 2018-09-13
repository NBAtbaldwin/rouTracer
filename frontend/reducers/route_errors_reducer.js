import { RECEIVE_ROUTE_ERRORS, RECEIVE_ROUTE, CLEAR_ROUTE_ERRORS } from "./../actions/route_actions";

const routeErrorsReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ROUTE_ERRORS:
      return action.errors;
    case CLEAR_ROUTE_ERRORS:
      return [];
    case RECEIVE_ROUTE:
      return [];
    default:
      return oldState;
  }
};

export default routeErrorsReducer;
