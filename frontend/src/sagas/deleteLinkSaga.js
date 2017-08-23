import { put, takeEvery, call } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import { sendRequest } from '../api'

import {
  DELETE_LINK_REQUESTED,
  DELETE_LINK_SUCCEED,
  DELETE_LINK_FAILED
} from '../modules/deleteLink'

import { showNotification } from '../modules/notifications'

export function* deleteLinkSaga(action) {
  const managementHash = action.payload
  try {
    let data = yield call(sendRequest, '/links/' + managementHash, {
      method: 'DELETE'
    })

    yield put({
      type: DELETE_LINK_SUCCEED,
      payload: {
        ...data
      }
    })

    yield put(push('/'))

    // Show success notification
    yield put(showNotification(
      'Link has been successfully deleted.',
      'success'
    ))
  } catch(error) {
    yield put({
      type: DELETE_LINK_FAILED,
      payload: {
        error: error.message || error.error
      }
    })
  }
}

export default function* watchDeleteLinkSaga() {
  yield takeEvery(DELETE_LINK_REQUESTED, deleteLinkSaga)
}
