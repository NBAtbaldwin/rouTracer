import { RECEIVE_COMMENT, DELETE_COMMENT } from "./../actions/comment_actions";
import { LOGOUT_CURRENT_USER } from './../actions/session_actions';
import { merge } from 'lodash';
import { RECEIVE_ACTIVITY, RECEIVE_ACTIVITIES } from "./../actions/activity_actions";

const commentsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_COMMENT:
      return merge({}, oldState, {[action.comment.id]: action.comment});
    case RECEIVE_ACTIVITY:
      return merge({}, oldState, action.payload.comments);
    case DELETE_COMMENT:
      let newState = merge({}, oldState);
      delete newState[action.commentId];
      return newState;
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return oldState;
  }
};

export default commentsReducer;
