import {
  fetchFollowersRequest,
  fetchFollowersSuccess,
  fetchFollowersFailure,
} from 'ducks/followers';
import { takeLatest, call, put } from 'redux-saga/effects';
import { getUserFollowers } from 'api';

function* fetchFollowersSaga(action) {
  yield console.log('В саге fetchFollowersSaga в action ' + action);
  try {
    const response = yield call(getUserFollowers, action.payload); // вызываем сетевой запрос на получение списка фолловеров,
    // аргументом - action.payload, возвращает объект ????, который запишем  в response
    yield console.log('Сага fetchFollowersSaga вернул ' + response);
    yield put(fetchFollowersSuccess(response.data)); // по окончанию загрузки вызываем
    // экшен успешного получения фолловеров, аргументом - объект response.data, который в redux isFetched переводит в true
  } catch (error) {
    yield put(fetchFollowersFailure(error)); // при ошибке  вызываем экшен fetchFollowersFailure,
    // который в redux в error передаст errors
  }
}

export function* fetchFollowersWatch() {
  yield takeLatest(fetchFollowersRequest, fetchFollowersSaga); // ф-ция наблюдения ..... каждый раз когда вызывается
  // экшен fetchFollowersRequest  - вызывает сагу fetchFollowersSaga. При этом предыдущий вызов саги fetchFollowersSaga отменяется.
}
