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

export const updateUser = (userData) => dispatch => (
  UserUtil.updateUser(userData).then((payload) => {
    dispatch(receiveUser(payload))
  })
)

export const fetchPendingFriends = () => dispatch => (
  UserUtil.getPendingFriendshipUsers().then((users) => (dispatch(receiveUsers(users))))
);

export const createFriendship = friendship => dispatch => (
  UserUtil.createFriendship(friendship).then((payload) => (dispatch(receiveUser(payload))))
);

export const updateFriendship = friendship => dispatch => (
  UserUtil.updateFriendship(friendship).then((payload) => (dispatch(receiveUser(payload))))
);

export const deleteFriendship = friendship => dispatch => (
  UserUtil.deleteFriendship(friendship).then((payload) => (dispatch(receiveUser(payload))
  ))
);
