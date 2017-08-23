import { sendRequest } from '../api/index.js'

export const FETCH_LINK_REQUESTED = 'FETCH_LINK_REQUESTED'
export const FETCH_LINK_SUCCEED = 'FETCH_LINK_SUCCEED'
export const FETCH_LINK_FAILED = 'FETCH_LINK_FAILED'

export const fetchLink = managementHash => ({
  type: FETCH_LINK_REQUESTED,
  payload: managementHash
})

export const defaultState = {
  error: null,
  loading: false,
  loaded: false,
  hash: '',
  url: ''
}

export default function createLinkReducer(state = defaultState, action) {
  switch(action.type) {
    case FETCH_LINK_REQUESTED:
      return {
        ...defaultState,
        loading: true,
      }
    case FETCH_LINK_SUCCEED:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null,
        ...action.payload
      }
    case FETCH_LINK_FAILED:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error
      }
  }

  return state
}
