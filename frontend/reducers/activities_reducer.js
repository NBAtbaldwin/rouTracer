import { RECEIVE_ACTIVITY, DELETE_ACTIVITY, RECEIVE_ACTIVITIES } from "./../actions/activity_actions";
import { LOGOUT_CURRENT_USER } from './../actions/session_actions';
import { merge } from 'lodash';

const activitiesReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  let activity;

  switch (action.type) {
    case RECEIVE_ACTIVITIES:
      return merge({}, oldState, action.payload.activity);
    case RECEIVE_ACTIVITY:
      activity = action.payload.activity;
      return merge({}, oldState, { [activity.id]: activity });
    case DELETE_ACTIVITY:
      let newState = merge({}, oldState);
      delete newState[action.activityId];
      return newState;
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return oldState;
  }
};

export default activitiesReducer;
