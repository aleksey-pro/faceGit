import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { createActions } from 'redux-actions';

const { fetchUserRequest, fetchUserSuccess, fetchUserFailure } = createActions(
  'FETCH_USER_REQUEST',
  'FETCH_USER_SUCCESS',
  'FETCH_USER_FAILURE',
);
const { fetchTokenOwnerRequest } = createActions('FETCH_TOKEN_OWNER_REQUEST');

const { fetchFollowersRequest, fetchFollowersSuccess, fetchFollowersFailure } = createActions(
  'FETCH_FOLLOWERS_REQUEST',
  'FETCH_FOLLOWERS_SUCCESS',
  'FETCH_FOLLOWERS_FAILURE',
);

const isFetching = handleActions(
  {
    [fetchFollowersRequest]: () => true,
    [fetchFollowersSuccess]: () => false,
    [fetchFollowersFailure]: () => false,
  },
  false,
);

const isFetched = handleActions(
  {
    [fetchFollowersRequest]: () => false,
    [fetchFollowersSuccess]: () => true,
    [fetchFollowersFailure]: () => true,
    [fetchUserRequest]: () => false,
  },
  false,
);

const ids = handleActions(
  {
    [fetchUserRequest]: (state, action) => [],
    [fetchFollowersSuccess]: (state, action) => action.payload,
  },
  [],
);

const error = handleActions(
  {
    [fetchFollowersRequest]: (state, action) => null,
    [fetchFollowersSuccess]: (state, action) => null,
    [fetchFollowersFailure]: (state, action) => action.error,
  },
  null,
);

export default combineReducers({
  ids,
  error,
  isFetched,
  isFetching,
});

export {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  fetchTokenOwnerRequest,
  fetchFollowersRequest,
  fetchFollowersSuccess,
  fetchFollowersFailure,
};

export const getIsFetching = state => state.followers.isFetching;
export const getIsFetched = state => state.followers.isFetched;
export const getFollowers = state => state.followers.ids;
