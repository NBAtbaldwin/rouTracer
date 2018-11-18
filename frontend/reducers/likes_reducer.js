import { RECEIVE_LIKE, DELETE_LIKE, RECEIVE_LIKES } from "./../actions/like_actions";
import { LOGOUT_CURRENT_USER } from './../actions/session_actions';
import { merge } from 'lodash';
import { RECEIVE_ACTIVITY, RECEIVE_ACTIVITIES } from "./../actions/activity_actions";

const likesReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    // case RECEIVE_LIKES:
    //   return merge({}, action.likes);
    case RECEIVE_LIKE:
      return merge({}, oldState, {[action.like.id]: action.like});
    case RECEIVE_ACTIVITIES:
      return merge({}, oldState, action.payload.like);
    case RECEIVE_ACTIVITY:
      return merge({}, oldState, action.payload.likes);
    case DELETE_LIKE:
      let newState = merge({}, oldState);
      delete newState[action.likeId];
      return newState;
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return oldState;
  }
};

export default likesReducer;
