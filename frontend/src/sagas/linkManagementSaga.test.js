import { put, call, takeEvery } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import watchFetchLinkSaga, { fetchLinkSaga } from './linkManagementSaga'
import {
  fetchLink,
  FETCH_LINK_SUCCEED,
  FETCH_LINK_FAILED
} from '../modules/linkManagement'

import { sendRequest } from '../api'

it('should call fetchLink generator for every FETCH_LINK_REQUESTED action', () => {
  const managementHash = 'abcd'
  const fetchLinkAction = fetchLink(managementHash)
  const gen = watchFetchLinkSaga(fetchLinkAction)

  expect(gen.next().value).toEqual(
    takeEvery(fetchLinkAction.type, fetchLinkSaga)
  )

  expect(gen.next().done).toEqual(true)
})


it('should handle FETCH_LINK_REQUESTED action', () => {
  const managementHash = 'abcd'
  const fetchLinkAction = fetchLink(managementHash)
  const gen = fetchLinkSaga(fetchLinkAction)

  // it should call sendRequest with proper parameters
  expect(gen.next().value).toEqual(
    call(
      sendRequest,
      '/links/' + managementHash,
      {
        method: 'GET'
      }
    )
  )

  // provide result of the previous call to saga
  const apiCallResult = {
    url: 'http://google.com',
    managementHash,
    hash: '1234'
  }

  expect(gen.next(apiCallResult).value).toEqual(
    put({
      type: FETCH_LINK_SUCCEED,
      payload: apiCallResult
    })
  )

  expect(gen.next().done).toEqual(true)
})

it('should handle error thrown during api call', () => {
  const managementHash = 'abcd'
  const fetchLinkAction = fetchLink(managementHash)
  const gen = fetchLinkSaga(fetchLinkAction)

  // it should call sendRequest with proper parameters
  expect(gen.next().value).toEqual(
    call(
      sendRequest,
      '/links/' + managementHash,
      {
        method: 'GET'
      }
    )
  )

  // it should catch error and dispatch EDIT_LINK_FAILED
  expect(gen.throw({message: 'Server is offline'}).value).toEqual(
    put({
      type: FETCH_LINK_FAILED,
      payload: {
        error: 'Server is offline'
      }
    })
  )

  expect(gen.next().done).toEqual(true)
})
