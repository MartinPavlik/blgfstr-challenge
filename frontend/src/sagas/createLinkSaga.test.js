import { put, call, takeEvery } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import watchCreateLinkSaga, { createLinkSaga } from './createLinkSaga'
import { createLink, CREATE_LINK_SUCCEED, CREATE_LINK_FAILED } from '../modules/createLink'
import { showNotification } from '../modules/notifications'

import { sendRequest } from '../api'

it('should call createLink generator for every CREATE_LINK_REQUESTED action', () => {
  const url = 'http://google.com'
  const createLinkAction = createLink(url)
  const gen = watchCreateLinkSaga(createLinkAction)

  expect(gen.next().value).toEqual(
    takeEvery(createLinkAction.type, createLinkSaga)
  )

  expect(gen.next().done).toEqual(true)
})

it('should handle CREATE_LINK_REQUESTED action', () => {
  const url = 'http://google.com'
  const createLinkAction = createLink(url)
  const gen = createLinkSaga(createLinkAction)

  // it should call sendRequest with proper parameters
  expect(gen.next().value).toEqual(
    call(
      sendRequest,
      '/links',
      {
        method: 'POST',
        body: JSON.stringify({
          url
        })
      }
    )
  )

  // provide result of the previous call to saga
  const apiCallResult = {
    url,
    managementHash: 'abcd'
  }
  expect(gen.next(apiCallResult).value).toEqual(
    put({
      type: CREATE_LINK_SUCCEED,
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
      'Your link has been created :-)',
      'success'
    ))
  )

  expect(gen.next().done).toEqual(true)
})


it('should handle error thrown during api call', () => {
  const url = 'http://google.com'
  const createLinkAction = createLink(url)
  const gen = createLinkSaga(createLinkAction)

  // it should call sendRequest with proper parameters
  expect(gen.next().value).toEqual(
    call(
      sendRequest,
      '/links',
      {
        method: 'POST',
        body: JSON.stringify({
          url
        })
      }
    )
  )
  // it should catch error and dispatch CREATE_LINK_FAILED
  expect(gen.throw({message: 'Server is offline'}).value).toEqual(
    put({
      type: CREATE_LINK_FAILED,
      payload: {
        error: 'Server is offline'
      }
    })
  )

  expect(gen.next().done).toEqual(true)
})
