import { combineReducers } from 'redux';
import post from './post';
import account from './account';

const reducers = combineReducers({
  post, account
});

export default reducers;
