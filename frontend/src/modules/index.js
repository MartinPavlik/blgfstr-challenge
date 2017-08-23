import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import createLinkForm from './createLink'
import editLinkForm from './editLink'
import linkManagement from './linkManagement'
import deleteLink from './deleteLink'
import notifications from './notifications'

export default combineReducers({
  routing: routerReducer,
  createLinkForm,
  editLinkForm,
  linkManagement,
  deleteLink,
  notifications
})
