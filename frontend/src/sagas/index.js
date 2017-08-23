import { all } from 'redux-saga/effects'

import createLinkSaga from './createLinkSaga'
import deleteLinkSaga from './deleteLinkSaga'
import editLinkSaga from './editLinkSaga'
import linkManagementSaga from './linkManagementSaga'
import notificationSaga from './notificationSaga'

export default function* rootSaga() {
  yield all([
    createLinkSaga(),
    deleteLinkSaga(),
    editLinkSaga(),
    linkManagementSaga(),
    notificationSaga()
  ])
}
