
export const SHOW_NOTIFICATION = 'NOTIFICATIONS_SHOW_NOTIFICATION'
export const CREATE_NOTIFICATION = 'NOTIFICATIONS_CREATE_NOTIFICATION'
export const HIDE_NOTIFICATION = 'NOTIFICATIONS_HIDE_NOTIFICATION'
export const DELETE_NOTIFICATION = 'NOTIFICATIONS_DELETE_NOTIFICATION'

export const showNotification = (title, type, content = '') => ({
  type: SHOW_NOTIFICATION,
  payload: {
    title,
    type,
    content
  }
})

export const hideNotification = (id) => ({
  type: HIDE_NOTIFICATION,
  payload: id
})

/*
  This action should be called only from sagas, that provides unique id
*/
export const createNotification = (id, title, type, content) => ({
  type: CREATE_NOTIFICATION,
  payload: {
    id,
    title,
    type,
    content
  }
})

/*
  This action should be called only from sagas
*/
export const deleteNotification = (id) => ({
  type: DELETE_NOTIFICATION,
  payload: id
})



export const defaultState = []

export default function createLinkReducer(state = defaultState, action) {
  switch(action.type) {
    case CREATE_NOTIFICATION:
      return [
        { ...action.payload },
        ...state
      ]
    case DELETE_NOTIFICATION:
      return state.filter(
        notification => notification.id !== action.payload
      )
  }
  return state
}
