import { handleActions, createActions } from 'redux-actions';
import { combineReducers } from 'redux';

const { authorize, logout } = createActions('AUTHORIZE', 'LOGOUT');

const isAuthorized = handleActions(
  {
    [authorize]: () => true,
    [logout]: () => false,
  },
  false,
);

export default combineReducers({
  isAuthorized,
});

export { authorize, logout };
export const getIsAuthorized = state => state.auth.isAuthorized;
