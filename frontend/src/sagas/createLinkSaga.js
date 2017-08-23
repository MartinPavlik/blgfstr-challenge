import { put, takeEvery, call } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import { sendRequest } from '../api'

import {
  CREATE_LINK_REQUESTED,
  CREATE_LINK_SUCCEED,
  CREATE_LINK_FAILED
} from '../modules/createLink'

import { showNotification } from '../modules/notifications'

export function* createLinkSaga(action) {
  const url = action.payload
  try {
    let data = yield call(sendRequest, '/links', {
      method: 'POST',
      body: JSON.stringify({
        url
      })
    })

    yield put({
      type: CREATE_LINK_SUCCEED,
      payload: {
        ...data
      }
    })

    // Redirect user to management page
    yield put(push('/link/' + data.managementHash))

    // Show success notification
    yield put(showNotification(
      'Your link has been created :-)',
      'success'
    ))

  } catch(error) {
    yield put({
      type: CREATE_LINK_FAILED,
      payload: {
        error: error.message || error.error
      }
    })
  }
}

export default function* watchCreateLinkSaga() {
  yield takeEvery(CREATE_LINK_REQUESTED, createLinkSaga)
}
