import { put, takeEvery, call } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import { sendRequest } from '../api'

import {
  EDIT_LINK_REQUESTED,
  EDIT_LINK_SUCCEED,
  EDIT_LINK_FAILED
} from '../modules/editLink'

import { showNotification } from '../modules/notifications'

import {
  FETCH_LINK_SUCCEED
} from '../modules/linkManagement'

export function* editLinkSaga(action) {
  const { url, managementHash } = action.payload
  try {
    let data = yield call(sendRequest, '/links/' + managementHash, {
      method: 'PUT',
      body: JSON.stringify({
        url,
        managementHash
      })
    })
    yield put({
      type: EDIT_LINK_SUCCEED,
      payload: {
        ...data
      }
    })

    // Refresh stored link data
    yield put({
      type: FETCH_LINK_SUCCEED,
      payload: {
        ...data
      }
    })

    // Redirect user to management page
    yield put(push('/link/' + data.managementHash))

      // Show success notification
    yield put(showNotification(
      'Your link has been updated ;-)',
      'success'
    ))
  } catch(error) {
    yield put({
      type: EDIT_LINK_FAILED,
      payload: {
        error: error.message || error.error
      }
    })
  }
}

export default function* watchEditLinkSaga() {
  yield takeEvery(EDIT_LINK_REQUESTED, editLinkSaga)
}
