import { put, takeEvery, call, race, take } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { LOCATION_CHANGE } from 'react-router-redux'

import getRandomString from '../utils/getRandomString'

import {
  hideNotification,
  HIDE_NOTIFICATION,
  showNotification,
  SHOW_NOTIFICATION,
  createNotification,
  deleteNotification
} from '../modules/notifications'


import {
  waitUntilNotificationIsHiddenSaga,
  showNotificationSaga,
  NOTIFICATION_DURATION
} from './notificationSaga'

describe('#waitUntilNotificationIsHiddenSaga', () => {
  it('should finish only when action with the proper notificationId is fired', () => {

    const notificationId = 'abcd'
    const gen = waitUntilNotificationIsHiddenSaga(notificationId)

    const actionWithDifferentId = hideNotification('cdef')
    const actionWithSameId = hideNotification(notificationId)

    expect(gen.next().value).toEqual(
      take(HIDE_NOTIFICATION)
    )

    // it should ignore this action and wait for another HIDE_NOTIFICATION action
    expect(gen.next(actionWithDifferentId).value).toEqual(
      take(HIDE_NOTIFICATION)
    )

    // it should finish
    expect(gen.next(actionWithSameId).done).toEqual(true)
  })
})

describe('#showNotificationSaga', () => {
  it('should create notification, wait until it is hidden and then delete that notification', () => {

    const notificationId = 'abcd'
    const title = 'Title'
    const type = 'success'
    const content = 'Content'

    const gen = showNotificationSaga(showNotification(title, type, content))

    expect(gen.next().value).toEqual(
      call(getRandomString)
    )

    expect(gen.next(notificationId).value).toEqual(
      put(createNotification(notificationId, title, type, content))
    )

    expect(gen.next().value).toEqual(
      race({
        hiddenByUser: call(waitUntilNotificationIsHiddenSaga, notificationId),
        hiddenByDelay: call(delay, NOTIFICATION_DURATION),
        hiddenByLocationChange: take(LOCATION_CHANGE)
      })
    )

    expect(gen.next().value).toEqual(
      put(deleteNotification(notificationId))
    )

    expect(gen.next().done).toEqual(true)
  })
})
