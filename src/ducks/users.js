import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { fetchUserRequest, fetchUserSuccess, fetchUserFailure } from 'ducks/followers';

const isFetching = handleActions(
  {
    [fetchUserRequest]: () => true,
    [fetchUserSuccess]: () => false,
    [fetchUserFailure]: () => false,
  },
  false,
);

const isFetched = handleActions(
  {
    [fetchUserRequest]: () => false,
    [fetchUserSuccess]: () => true,
    [fetchUserFailure]: () => true,
  },
  false,
);

const data = handleActions(
  {
    [fetchUserRequest]: () => null,
    [fetchUserSuccess]: (state, action) => action.payload,
  },
  null,
);

const error = handleActions(
  {
    [fetchUserRequest]: (state, action) => null,
    [fetchUserSuccess]: (state, action) => null,
    [fetchUserFailure]: (state, action) => action.error,
  },
  null,
);

export default combineReducers({
  data,
  error,
  isFetched,
  isFetching,
});

export const getUser = state => state.users.data;
export const getIsFetching = state => state.users.isFetching;
export const getIsFetched = state => state.users.isFetched;
