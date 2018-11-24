import * as ApiUtil from './../util/activity_util';
export const RECEIVE_ACTIVITY = 'RECEIVE_ACTIVITY';
export const RECEIVE_ACTIVITIES = 'RECEIVE_ACTIVITIES';
export const DELETE_ACTIVITY = 'DELETE_ACTIVITY';
export const RECEIVE_ACTIVITY_ERRORS = 'RECEIVE_ACTIVITY_ERRORS';
export const CLEAR_ACTIVITY_ERRORS = 'CLEAR_ACTIVITY_ERRORS';
export const ACTIVITY_LOADING = 'ACTIVITY_LOADING';

export const receiveAllActivities = (payload) => ({
  type: RECEIVE_ACTIVITIES,
  payload: payload
});

export const activityLoading = () => ({
  type: ACTIVITY_LOADING,
});

export const receiveActivity = (payload) => ({
  type: RECEIVE_ACTIVITY,
  payload: payload
});

export const removeActivity = (activityId) => ({
  type: DELETE_ACTIVITY,
  activityId: activityId
});

export const receiveErrors = (errors) => {
  return {
    type: RECEIVE_ACTIVITY_ERRORS,
    errors: errors
  };
};

export const clearActivityErrors = () => {
  return {
    type: CLEAR_ACTIVITY_ERRORS
  };
};

export const fetchActivities = () => dispatch => {
  dispatch(activityLoading());
  return ApiUtil.getActivities().then((activities) => (dispatch(receiveAllActivities(activities))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
};

export const fetchActivity = id => dispatch => {
  dispatch(activityLoading());
  return ApiUtil.getActivity(id).then((activity) => (dispatch(receiveActivity(activity))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
};

export const createActivity = activity => dispatch => (
  ApiUtil.createActivity(activity).then((activity) => (dispatch(receiveActivity(activity))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const updateActivity = activity => dispatch => {
  dispatch(activityLoading());
  return ApiUtil.updateActivity(activity).then((activity) => (dispatch(receiveActivity(activity))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
};

export const deleteActivity = id => dispatch => (
  ApiUtil.deleteActivity(id).then((activity) => (dispatch(removeActivity(id))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);
