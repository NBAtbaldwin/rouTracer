import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from "./../actions/session_actions";
import { merge } from 'lodash';

const _nullUser = { id: null };

const sessionReducer = (oldState = _nullUser, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return { id: action.payload.user.id };
    case LOGOUT_CURRENT_USER:
      return _nullUser;
    default:
      return oldState;
  }
};

export default sessionReducer;
