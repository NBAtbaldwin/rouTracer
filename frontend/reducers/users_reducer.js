import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from "./../actions/session_actions";
import { RECEIVE_USER, RECEIVE_USERS } from "./../actions/user_actions";

import { merge } from 'lodash';

const usersReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let currentUser;
  let friends;
  let newState;
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      friends = action.payload.friends;
      currentUser = { [action.payload.user.id]: action.payload.user };
      newState = merge({}, friends, currentUser);
      console.log(newState);
      return merge({}, oldState, newState);
    case LOGOUT_CURRENT_USER:
      return {};
    case RECEIVE_USER:
      newState = action.payload.friends;
      return merge({}, oldState, newState);
    case RECEIVE_USERS:
      newState = action.users;
      return merge({}, oldState, newState)
    default:
      return oldState;
  }
};

export default usersReducer;
