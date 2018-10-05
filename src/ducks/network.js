import { createActions, handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

import {} from 'redux-actions';

const { clearNetworkErrors, networkError } = createActions('CLEAR_NETWORK_ERRORS', 'NETWORK_ERROR');

const error = handleActions(
  {
    [clearNetworkErrors]: () => null,
    [networkError]: (state, action) => action.payload,
  },
  null,
);

const message = handleActions(
  {
    [clearNetworkErrors]: () => null,
    [networkError]: (state, action) => action.payload.response.data.message,
  },
  null,
);

export default combineReducers({
  error,
  message,
});

export { clearNetworkErrors, networkError };
export const getIsNetworkErrorPresent = state => state.network.error != null;
export const getNetworkError = state => state.network.message;
