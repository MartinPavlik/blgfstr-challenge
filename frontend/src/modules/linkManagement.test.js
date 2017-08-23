import reducer, {
  fetchLink,
  FETCH_LINK_REQUESTED,
  FETCH_LINK_SUCCEED,
  FETCH_LINK_FAILED,
  defaultState
} from './linkManagement'


describe('actions', () => {
  it(`should create action FETCH_LINK_REQUESTED`, () => {
    const managementHash = 'abcd'
    const expectedAction = {
      type: FETCH_LINK_REQUESTED,
      payload: managementHash
    }
    expect(fetchLink(managementHash)).toEqual(expectedAction)
  })
})


describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(defaultState)
  })

  it(`should handle FETCH_LINK_REQUEST`, () => {
    const managementHash = 'abcd'

    const action = fetchLink(managementHash)

    expect(reducer(undefined, action)).toEqual({
      ...defaultState,
      loading: true
    })

    expect(reducer(
      {
        ...defaultState,
        url: 'http://google.com',
        hash: 'abcd',
        loaded: true,
        loading: false
      },
      action
    )).toEqual({
      ...defaultState,
      loading: true,
      loaded: false
    })
  })

  it('should handle FETCH_LINK_SUCCEED', () => {
    const action = {
      type: FETCH_LINK_SUCCEED,
      payload: {
        url: 'http://google.com',
        hash: '12345'
      }
    }

    const state = {
      ...defaultState,
      loading: true
    }

    const nextState = {
      ...defaultState,
      loading: false,
      loaded: true,
      url: 'http://google.com',
      hash: '12345'
    }

    expect(reducer(state, action)).toEqual(nextState)
  })

  it('should handle FETCH_LINK_FAILED', () => {
    const action = {
      type: FETCH_LINK_FAILED,
      payload: {
        error: 'Server is offline.'
      }
    }

    const state = {
      ...defaultState,
      loading: true,
      error: null
    }

    const nextState = {
      ...defaultState,
      loading: false,
      loaded: false,
      error: 'Server is offline.'
    }

    expect(reducer(state, action)).toEqual(nextState)
  })
})
