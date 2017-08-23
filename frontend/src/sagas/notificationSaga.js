import { put, takeEvery, call, race, take } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { LOCATION_CHANGE } from 'react-router-redux'

import getRandomString from '../utils/getRandomString'

import {
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
  createNotification,
  deleteNotification
} from '../modules/notifications'

export const NOTIFICATION_DURATION = 5000

/*
  Waits until action HIDE_NOTIFICATION is fired.
  When the fired action has it's payload equal to notificationId
  then the saga is finished.
*/
export function* waitUntilNotificationIsHiddenSaga(notificationId) {
  while(true) {
    const action = yield take(HIDE_NOTIFICATION)
    if (notificationId == action.payload) {
      break;
    }
  }
}

export function* showNotificationSaga(action) {

  const id = yield call(getRandomString)
  const { title, type, content } = action.payload

  yield put(createNotification(id, title, type, content))

  yield race({
    hiddenByUser: call(waitUntilNotificationIsHiddenSaga, id),
    hiddenByDelay: call(delay, NOTIFICATION_DURATION),
    hiddenByLocationChange: take(LOCATION_CHANGE)
  })

  /*
    It does not matter which reason was behind hiding
    the notification, cause it has to be the notification we created earlier above.
    (check waitUntilNotificationIsHidden)
  */
  yield put(deleteNotification(id))
}

export default function* watchShowNotificationSaga() {
  yield takeEvery(SHOW_NOTIFICATION, showNotificationSaga)
}
