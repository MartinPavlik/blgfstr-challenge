import { put, call, takeEvery } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import watchDeleteLinkSaga, { deleteLinkSaga } from './deleteLinkSaga'
import {
  deleteLink,
  DELETE_LINK_SUCCEED,
  DELETE_LINK_FAILED
} from '../modules/deleteLink'

import { showNotification } from '../modules/notifications'

import { sendRequest } from '../api'

it('should call deleteLink generator for every DELETE_LINK_REQUESTED action', () => {
  const managementHash = 'abcd'
  const deleteLinkAction = deleteLink(managementHash)
  const gen = watchDeleteLinkSaga(deleteLinkAction)

  expect(gen.next().value).toEqual(
    takeEvery(deleteLinkAction.type, deleteLinkSaga)
  )

  expect(gen.next().done).toEqual(true)
})


it('should handle DELETE_LINK_REQUESTED action', () => {
  const managementHash = 'abcd'
  const deleteLinkAction = deleteLink(managementHash)
  const gen = deleteLinkSaga(deleteLinkAction)

  // it should call sendRequest with proper parameters
  expect(gen.next().value).toEqual(
    call(
      sendRequest,
      '/links/' + managementHash,
      {
        method: 'DELETE'
      }
    )
  )

  // provide result of the previous call to saga
  const apiCallResult = {
    message: "Link has been deleted.",
  }

  expect(gen.next(apiCallResult).value).toEqual(
    put({
      type: DELETE_LINK_SUCCEED,
      payload: apiCallResult
    })
  )

  // it should redirect to the proper url
  expect(gen.next().value).toEqual(
    put(push('/'))
  )

  // it should show notification
  expect(gen.next().value).toEqual(
    put(showNotification(
      'Link has been successfully deleted.',
      'success'
    ))
  )

  expect(gen.next().done).toEqual(true)
})

it('should handle error thrown during api call', () => {
  const managementHash = 'abcd'
  const deleteLinkAction = deleteLink(managementHash)
  const gen = deleteLinkSaga(deleteLinkAction)

  // it should call sendRequest with proper parameters
  expect(gen.next().value).toEqual(
    call(
      sendRequest,
      '/links/' + managementHash,
      {
        method: 'DELETE'
      }
    )
  )

  // it should catch error and dispatch EDIT_LINK_FAILED
  expect(gen.throw({message: 'Server is offline'}).value).toEqual(
    put({
      type: DELETE_LINK_FAILED,
      payload: {
        error: 'Server is offline'
      }
    })
  )

  expect(gen.next().done).toEqual(true)
})
