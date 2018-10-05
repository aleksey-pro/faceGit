import { call, put, select } from 'redux-saga/effects';
import { clearNetworkErrors, networkError } from 'ducks/network';
import { logout } from 'ducks/auth';
import { getIsNetworkErrorPresent } from 'ducks/network';

export default function*(fn, args) {
  // функция сетевого запроса
  try {
    const response = yield call(fn, args); // вызовем ф-цию, переданную 1м аргументом, результат запишем в response
    yield console.log('Сага request вернул ' + response);
    if (yield select(getIsNetworkErrorPresent)) yield put(clearNetworkErrors()); // если она вернет экшен
    // getIsNetworkErrorPresent - вызови экшен clearNetworkErrors, который внутри redux в message вернет null
    return response;
  } catch (error) {
    // если возникла сетевая ошибка
    yield put(networkError(error)); // вызови экшен networkError, аргументом передай error,
    // которая в redux запишет в message номер ошибки
    if (error.response.status === 401) yield put(logout()); // если в error.response.status === 401  - вызови экшен logout
    // который в redux isAuthorized поставит в false
    throw error;
  }
}
