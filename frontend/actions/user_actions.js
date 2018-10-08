import * as UserUtil from './../util/user_util';
export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_USERS = 'RECEIVE_USERS';

export const receiveUser = (payload) => ({
  type: RECEIVE_USER,
  payload: payload,
});

export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users: users,
});

export const fetchUser = (id) => dispatch => (
  UserUtil.getUser(id).then((payload) => (dispatch(receiveUser(payload))))
)

export const fetchUsers = () => dispatch => (
  UserUtil.getUsers().then((users) => (dispatch(receiveUsers(users))))
);
