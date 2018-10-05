import { fetchUserReposRequest, fetchUserReposSuccess, fetchUserReposFailure } from 'ducks/repos'; // где repos экшены?????
import { takeLatest, call, put } from 'redux-saga/effects';
import { getUserRepos } from 'api';

function* fetchUserSaga(action) {
  // откуда берем action? он ведь должен передаваться аргументом с вызовом саги
  try {
    const user = yield call(getUserRepos, action.payload); // вызываем сетевой запрос на получение репо,
    // аргументом - action.payload, возвращает объект ????, который запишем  в user
    yield console.log('Сага fetchUserSaga вернул ' + user);
    yield put(fetchUserReposSuccess(user)); // по окончанию загрузки вызываем экшен успешного получения репо, аргументом -???
  } catch (error) {
    yield put(fetchUserReposFailure(error)); // при ошибке вызваем экшен ошибки получения репо
  }
}

export function* fetchUserReposWatch() {
  yield takeLatest(fetchUserReposRequest, fetchUserSaga); // ф-ция наблюдения ..... каждый раз когда вызывается
  // экшен fetchUserReposRequest  - вызывает сагу fetchUserSaga. При этом предыдущий вызов саги fetchUserSaga отменяется.
}
