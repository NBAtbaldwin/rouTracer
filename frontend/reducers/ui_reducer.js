import { combineReducers } from 'redux';
import loadingReducer from './loading_reducer';

const uiReducer = combineReducers({
  loading: loadingReducer,
});

export default uiReducer;
