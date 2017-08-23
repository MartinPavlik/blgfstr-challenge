export const DELETE_LINK_REQUESTED = 'DELETE_LINK_REQUESTED'
export const DELETE_LINK_SUCCEED = 'DELETE_LINK_SUCCEED'
export const DELETE_LINK_FAILED = 'DELETE_LINK_FAILED'

export const RESET = 'DELETE_LINK_RESET'

export const reset = () => ({
  type: RESET
})

export const deleteLink = managementHash => ({
  type: DELETE_LINK_REQUESTED,
  payload: managementHash
})

const defaultState = {
  error: null,
  loading: false,
  loaded: false
}

export default function deleteLinkReducer(state = defaultState, action) {
  switch(action.type) {
    case RESET:
      return {
        ...defaultState
      }
    case DELETE_LINK_REQUESTED:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null
      }
    case DELETE_LINK_SUCCEED:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null
      }
    case DELETE_LINK_FAILED:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error
      }
  }

  return state
}
