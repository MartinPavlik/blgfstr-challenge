import { put, takeEvery, call } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import { sendRequest } from '../api'

import {
  FETCH_LINK_REQUESTED,
  FETCH_LINK_SUCCEED,
  FETCH_LINK_FAILED
} from '../modules/linkManagement'

export function* fetchLinkSaga(action) {
  const managementHash = action.payload
  try {
    let data = yield call(sendRequest, '/links/' + managementHash, {
      method: 'GET'
    })
    yield put({
      type: FETCH_LINK_SUCCEED,
      payload: {
        ...data
      }
    })
  } catch(error) {
    console.error("FETCH FAILED:", error)
    yield put({
      type: FETCH_LINK_FAILED,
      payload: {
        error: error.message || error.error
      }
    })
  }
}

export default function* watchFetchLinkSaga() {
  yield takeEvery(FETCH_LINK_REQUESTED, fetchLinkSaga)
}
