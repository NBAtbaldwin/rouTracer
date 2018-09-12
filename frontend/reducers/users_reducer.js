import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from "./../actions/session_actions";
import { merge } from 'lodash';

const usersReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, oldState, { [action.currentUser.id]: action.currentUser});
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return oldState;
  }
};

export default usersReducer;
