import { combineReducers } from 'redux';
import users from './users.js';
// import repos from './repos';
import followers from './followers';
import network from './network';
import auth from './auth';

export default combineReducers({
  auth,
  followers,
  network,
  // repos,
  users,
});
