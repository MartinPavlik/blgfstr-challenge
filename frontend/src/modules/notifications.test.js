import reducer, {
  showNotification,
  hideNotification,
  createNotification,
  deleteNotification,
  CREATE_NOTIFICATION,
  DELETE_NOTIFICATION,
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION
} from './notifications'


describe('actions', () => {
  it(`should create action - ${CREATE_NOTIFICATION}`, () => {
    const id = 'abcd'
    const title = 'Title'
    const type = 'fail'
    const content = 'Content'
    const expectedAction = {
      type: CREATE_NOTIFICATION,
      payload: {
        id,
        title,
        type,
        content
      }
    }
    expect(createNotification(id, title, type, content)).toEqual(expectedAction)
  })
  it(`should create action - ${DELETE_NOTIFICATION}`, () => {
    const id = 'abcd'
    const expectedAction = {
      type: DELETE_NOTIFICATION,
      payload: id
    }
    expect(deleteNotification(id)).toEqual(expectedAction)
  })
  it(`should create action - ${SHOW_NOTIFICATION}`, () => {
    const title = 'Title'
    const type = 'fail'
    const content = 'Content'
    const expectedAction = {
      type: SHOW_NOTIFICATION,
      payload: {
        title,
        type,
        content
      }
    }
    expect(showNotification(title, type, content)).toEqual(expectedAction)
  })
  it(`should create action - ${HIDE_NOTIFICATION}`, () => {
    const id = 'abcd'
    const expectedAction = {
      type: HIDE_NOTIFICATION,
      payload: id
    }
    expect(hideNotification(id)).toEqual(expectedAction)
  })
})


describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([])
  })

  it(`should ignore ${SHOW_NOTIFICATION}`, () => {
    const title = 'Title'
    const type = 'fail'
    const content = 'Content'
    const action = showNotification(title, type, content)
    expect(reducer([], action)).toEqual([])
  })

  it(`should ignore ${HIDE_NOTIFICATION}`, () => {
    const id = 'abcd'
    const action = hideNotification(id)
    expect(reducer([{id: 'abcd'}], action)).toEqual([{id: 'abcd'}])
  })

  it(`should handle ${CREATE_NOTIFICATION}`, () => {
    const id = 'abcd'
    const title = 'Title'
    const type = 'fail'
    const content = 'Content'
    const action = createNotification(id, title, type, content)

    expect(reducer([], action)).toEqual([{
      id, title, type, content
    }])

    const action2 = createNotification('12345', 'lala', 'success', 'foo')

    // It should always prepend a new notification to the existing array
    expect(reducer([{id, title, type, content}], action2)).toEqual([
      {
        id: '12345',
        title: 'lala',
        type: 'success',
        content: 'foo'
      },
      {
        id, title, type, content
      }
    ])
  })

  it(`should handle ${DELETE_NOTIFICATION}`, () => {
    const id = '1234'
    const action = deleteNotification(id)
    expect(reducer([{id: 'abcd'}, {id: '1234'}, {id: 'efgh'}], action)).toEqual([{id: 'abcd'}, {id: 'efgh'}])
    expect(reducer([{id: '1234'}], action)).toEqual([])
  })
})
