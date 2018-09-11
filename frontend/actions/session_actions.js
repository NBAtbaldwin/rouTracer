import * as ApiUtil from './../util/session_api_util';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_ERRORS';

export const login = (user) => {
  return (dispatch) => {
    return ApiUtil.login(user).then(user => {
      return dispatch(receiveCurrentUser(user));
    });
  };
};

export const signup = (user) => {
  return (dispatch) => {
    return ApiUtil.signup(user).then(user => dispatch(receiveCurrentUser(user)));
  };
};

export const logout = () => {
  return (dispatch) => {
    return ApiUtil.logout().then( () => dispatch(logoutCurrentUser()));
  };
};

export const receiveCurrentUser = (currentUser) => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser
  };
};

export const logoutCurrentUser = () => {
  return {
    type: LOGOUT_CURRENT_USER
  };
};

export const receiveErrors = (errors) => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors: errors
  };
};
