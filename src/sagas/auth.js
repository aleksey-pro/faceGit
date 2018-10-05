import { take, put, call, select } from 'redux-saga/effects';
import { setTokenApi, clearTokenApi } from 'api';
import { authorize, logout, getIsAuthorized } from 'ducks/auth';
import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
  removeTokenFromLocalStorage,
} from 'localStorage';

export function* authFlow() {
  while (true) {
    //сначала определим авторизованы мы или нет
    const isAuthorized = yield select(getIsAuthorized); // вызываем селектор getIsAuthorized, который в redux считывает состояние
    const localStorageToken = yield call(getTokenFromLocalStorage); // смотрим в хранилице наличие ключа
    let token;

    if (!isAuthorized && localStorageToken) {
      // если неавторизован и ключ есть
      token = localStorageToken; // в переменую token кладем значение из хранилища
      yield put(authorize()); //вызваем экшен authorize, который isAuthorized переведет в true
    } else {
      // если неавторизован и нет ключа
      const action = yield take(authorize); // ждем экшена authorize и ничего не делаем пока он не придет, и при наступлении -
      // вызываем authorize. Это как раз описание начального состояния приложения. authorize вызваем в компоненте Login
      // почему authorize без скобок. take делает так -  когда придет экшен authorize должен вызваться сам authorize.
      yield console.log('Сага authFlow вернул ' + action);
      token = action.payload; // в значение token поместим action.payload, это значение из поля inpit
    }

    yield call(setTokenApi, token); // вызываем сетевой вызов записи ключа
    yield call(setTokenToLocalStorage, token); // запишем ключ в хранилище
    yield take(logout); // ждем экшена logout
    yield call(removeTokenFromLocalStorage); // если он наступил - удалим из  хранилища ключ
    yield call(clearTokenApi); // вызовем сетевой вызов на удаление ключа
  }
}
