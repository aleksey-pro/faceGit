import {
  fetchUserRequest,
  fetchTokenOwnerRequest,
  fetchUserSuccess,
  fetchUserFailure,
} from 'ducks/followers';
import { takeLatest, call, put } from 'redux-saga/effects';
import requestFlow from './request';
import { getUserInformation, getTokenOwner } from 'api';

export function* fetchUserSaga(action) {
  yield console.log('В саге users в action ' + action);
  try {
    let response;
    if (fetchTokenOwnerRequest.toString() === action.type) {
      /// если навзвания экшенов совпадают???????
      // как мы вызваем в call  другую сагу, когда в методичке сказано, что нужно
      // использовать каждый раз, когда происходит вызов внешней функции, не описанной с помощью эффектов redux-saga.
      // я думал саги через call вызывать нельзя. И вроде бы fork вызвает другие саги.
      response = yield call(requestFlow, getTokenOwner, action.payload); //вызываем сагу requestFlow, аргументом  -
      // ф-уию сетевого запроса пользователя ключа и action.payload ( что там??????)
      yield console.log('Сага fetchUserSaga вернул ' + response);
    } else {
      response = yield call(requestFlow, getUserInformation, action.payload); // иначе вызываем сагу requestFlow, аргументом  -
      // ф-цию сетевого запроса на вход на страницу пользователя и action.payload ( что там??????)
      yield console.log('Сага fetchUserSaga вернул ' + response);
    }
    yield put(fetchUserSuccess(response.data)); //  по окончанию загрузки вызываем экшен успешного получения
    // данных о пользователе, аргументом - объект?? , котоорый в redux в массив ids кладет response.data
    yield console.log('Сага fetchUserSaga, fetchUserSuccess вернул ' + response.data);
  } catch (error) {
    yield put(fetchUserFailure(error)); // при ошибке вызываем экшен fetchUserFailure, который в redux в error передает error
  }
}

export function* fetchUserWatch() {
  yield takeLatest([fetchUserRequest, fetchTokenOwnerRequest], fetchUserSaga);
} // ф-ция наблюдения ..... каждый раз когда вызывается
// экшен fetchUserRequest и  fetchTokenOwnerRequest - вызывает сагу fetchUserSaga.
// При этом предыдущий вызов саги fetchUserSaga отменяется.
