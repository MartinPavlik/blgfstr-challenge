
import factory from './linkFormReducerFactory'

const actionTypes = {
  submit: 'SUBMIT_REQUESTED',
  submitSucceed: 'SUBMIT_SUCCEED',
  submitFailed: 'SUBMIT_FAILED',
  changeFormValue: 'CHANGE_FORM_VALUE',
  validationError: 'VALIDATION_ERROR',
  resetForm: 'RESET_FORM'
}

const inputs = [{
  name: 'url',
  defaultValue: ''
}]

it('should create reducer (function)', () => {
  const reducer = factory(actionTypes, inputs)
  expect(typeof reducer).toEqual('function')
})

it('should return the default state', () => {
  const reducer = factory(actionTypes, inputs)
  expect(reducer(undefined, {})).toEqual({
    error: null,
    loading: false,
    loaded: false,
    inputs: {
      url: {
        value: '',
        touched: false,
        validationError: null
      }
    }
  })
})

it('should handle submit action', () => {
  const reducer = factory(actionTypes, inputs)
  const state = {
    error: null,
    loading: false,
    loaded: false,
    inputs: {
      url: {
        value: '',
        touched: false,
        validationError: null
      }
    }
  }

  const nextState = {
    error: null,
    loading: true,
    loaded: false,
    inputs: {
      url: {
        value: '',
        touched: false,
        validationError: null
      }
    }
  }

  const action = {
    type: actionTypes.submit
  }

  expect(reducer(state, action)).toEqual(nextState)
})

it('should handle submitSucceed action', () => {
  const reducer = factory(actionTypes, inputs)
  const state = {
    error: null,
    loading: true,
    loaded: false,
    inputs: {
      url: {
        value: '',
        touched: false,
        validationError: null
      }
    }
  }

  const nextState = {
    error: null,
    loading: false,
    loaded: true,
    inputs: {
      url: {
        value: '',
        touched: false,
        validationError: null
      }
    }
  }

  const action = {
    type: actionTypes.submitSucceed
  }

  expect(reducer(state, action)).toEqual(nextState)
})

it('should handle submitFailed action', () => {
  const reducer = factory(actionTypes, inputs)
  const state = {
    error: null,
    loading: true,
    loaded: false,
    inputs: {
      url: {
        value: '',
        touched: false,
        validationError: null
      }
    }
  }

  const error = 'Server is offline'

  const nextState = {
    error,
    loading: false,
    loaded: false,
    inputs: {
      url: {
        value: '',
        touched: false,
        validationError: null
      }
    }
  }

  const action = {
    type: actionTypes.submitFailed,
    payload: {
      error
    }
  }

  expect(reducer(state, action)).toEqual(nextState)
})

it('should handle changeFormValue action', () => {
  const reducer = factory(actionTypes, inputs)
  const state = {
    error: null,
    loading: false,
    loaded: false,
    inputs: {
      url: {
        value: '',
        touched: false,
        validationError: null
      }
    }
  }

  const value = 'abcd'

  const nextState = {
    error: null,
    loading: false,
    loaded: false,
    inputs: {
      url: {
        value,
        touched: true,
        validationError: null
      }
    }
  }

  const action = {
    type: actionTypes.changeFormValue,
    payload: {
      value,
      name: 'url'
    }
  }

  expect(reducer(state, action)).toEqual(nextState)
})

it('should handle reset action', () => {
  const reducer = factory(actionTypes, inputs)
  const state = {
    error: 'Server is offline.',
    loading: true,
    loaded: true,
    inputs: {
      url: {
        value: 'lalala',
        touched: true,
        validationError: 'Some error.'
      }
    }
  }

  const value = 'abcd'

  const nextState = {
    error: null,
    loading: false,
    loaded: false,
    inputs: {
      url: {
        value: '',
        touched: false,
        validationError: null
      }
    }
  }

  const action = {
    type: actionTypes.resetForm
  }

  expect(reducer(state, action)).toEqual(nextState)
})

it('should handle validationError action', () => {
  const reducer = factory(actionTypes, inputs)
  const state = {
    error: null,
    loading: false,
    loaded: false,
    inputs: {
      url: {
        value: 'lalala',
        touched: true,
        validationError: null
      }
    }
  }

  const error = 'Some error'
  const nextState = {
    ...state,
    inputs: {
      url: {
        ...state.inputs.url,
        validationError: error
      }
    }
  }

  const action = {
    type: actionTypes.validationError,
    payload: {
      name: 'url',
      errorMessage: error
    }
  }

  expect(reducer(state, action)).toEqual(nextState)
})
