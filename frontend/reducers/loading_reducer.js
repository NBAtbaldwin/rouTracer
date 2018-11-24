import { RECEIVE_CURRENT_USER } from "./../actions/session_actions";
import { RECEIVE_USER, RECEIVE_USERS, USER_LOADING } from "./../actions/user_actions";
import { RECEIVE_ROUTE, RECEIVE_ROUTES } from "./../actions/route_actions";
import { RECEIVE_COMMENT, RECEIVE_COMMENTS, COMMENT_LOADING } from "./../actions/comment_actions";
import { RECEIVE_ACTIVITY, RECEIVE_ACTIVITIES, ACTIVITY_LOADING } from "./../actions/activity_actions";

const initialState = {
  activityLoading: false,
  userLoading: false,
  routeLoading: false,
  commentLoading: false,
  sessionLoading: false,
}

const loadingReducer = (oldState = initialState, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, oldState, { sessionLoading: false });
    case RECEIVE_USER:
      return Object.assign({}, oldState, { userLoading: false });
    case RECEIVE_USERS:
      return Object.assign({}, oldState, { userLoading: false });
    case RECEIVE_ROUTE:
      return Object.assign({}, oldState, { routeLoading: false });
    case RECEIVE_ROUTES:
      return Object.assign({}, oldState, { routeLoading: false });
    case RECEIVE_COMMENT:
      return Object.assign({}, oldState, { commentLoading: false });
    case RECEIVE_COMMENTS:
      return Object.assign({}, oldState, { commentLoading: false });
    case RECEIVE_ACTIVITY:
      return Object.assign({}, oldState, { activityLoading: false });
    case RECEIVE_ACTIVITIES:
      return Object.assign({}, oldState, { activityLoading: false });
    case ACTIVITY_LOADING:
      return Object.assign({}, oldState, { activityLoading: true });
    case COMMENT_LOADING:
      return Object.assign({}, oldState, { commentLoading: true });
    case USER_LOADING:
      return Object.assign({}, oldState, { userLoading: true });
    default:
      return oldState;
  }
};

export default loadingReducer;
