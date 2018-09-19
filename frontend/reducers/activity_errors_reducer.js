import { RECEIVE_ACTIVITY_ERRORS, RECEIVE_ACTIVITY, CLEAR_ACTIVITY_ERRORS } from "./../actions/activity_actions";

const activityErrorsReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ACTIVITY_ERRORS:
      return action.errors;
    case CLEAR_ACTIVITY_ERRORS:
      return [];
    case RECEIVE_ACTIVITY:
      return [];
    default:
      return oldState;
  }
};

export default activityErrorsReducer;
