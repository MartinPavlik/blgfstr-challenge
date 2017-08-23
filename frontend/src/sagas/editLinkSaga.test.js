import { put, call, takeEvery } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import watchEditLinkSaga, { editLinkSaga } from './editLinkSaga'
import {
  editLink,
  EDIT_LINK_SUCCEED,
  EDIT_LINK_FAILED
} from '../modules/editLink'

import { FETCH_LINK_SUCCEED } from '../modules/linkManagement'

import { showNotification } from '../modules/notifications'

import { sendRequest } from '../api'

it('should call editLink generator for every EDIT_LINK_REQUESTED action', () => {
  const url = 'http://google.com'
  const managementHash = 'abcd'
  const editLinkAction = editLink(managementHash, url)
  const gen = watchEditLinkSaga(editLinkAction)

  expect(gen.next().value).toEqual(
    takeEvery(editLinkAction.type, editLinkSaga)
  )

  expect(gen.next().done).toEqual(true)
})


it('should handle EDIT_LINK_REQUESTED action', () => {
  const url = 'http://google.com'
  const managementHash = 'abcd'
  const editLinkAction = editLink(managementHash, url)
  const gen = editLinkSaga(editLinkAction)

  // it should call sendRequest with proper parameters
  expect(gen.next().value).toEqual(
    call(
      sendRequest,
      '/links/' + managementHash,
      {
        method: 'PUT',
        body: JSON.stringify({
          url,
          managementHash
        })
      }
    )
  )

  // provide result of the previous call to saga
  const apiCallResult = {
    url,
    managementHash: 'abcd',
    hash: '1234'
  }

  expect(gen.next(apiCallResult).value).toEqual(
    put({
      type: EDIT_LINK_SUCCEED,
      payload: apiCallResult
    })
  )

  expect(gen.next(apiCallResult).value).toEqual(
    put({
      type: FETCH_LINK_SUCCEED,
      payload: apiCallResult
    })
  )

  // it should redirect to the proper url
  expect(gen.next().value).toEqual(
    put(push('/link/' + apiCallResult.managementHash))
  )

  // it should show notification
  expect(gen.next().value).toEqual(
    put(showNotification(
      'Your link has been updated ;-)',
      'success'
    ))
  )

  expect(gen.next().done).toEqual(true)
})

it('should handle error thrown during api call', () => {
  const url = 'http://google.com'
  const managementHash = 'abcd'
  const editLinkAction = editLink(managementHash, url)
  const gen = editLinkSaga(editLinkAction)

  // it should call sendRequest with proper parameters
  expect(gen.next().value).toEqual(
    call(
      sendRequest,
      '/links/' + managementHash,
      {
        method: 'PUT',
        body: JSON.stringify({
          url,
          managementHash
        })
      }
    )
  )

  // it should catch error and dispatch EDIT_LINK_FAILED
  expect(gen.throw({message: 'Server is offline'}).value).toEqual(
    put({
      type: EDIT_LINK_FAILED,
      payload: {
        error: 'Server is offline'
      }
    })
  )

  expect(gen.next().done).toEqual(true)
})
