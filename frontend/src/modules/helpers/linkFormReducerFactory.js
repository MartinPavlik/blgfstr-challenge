
export default function linkFormReducerFactory(actionTypes, inputs) {

  // Get action types map
  const {
    submit,
    submitSucceed,
    submitFailed,
    validationError,
    changeFormValue,
    resetForm
  } = actionTypes

  // Generate default state
  const defaultState = {
    error: null,
    loading: false,
    loaded: false,
    inputs: inputs.reduce((result, input) => {
      result[input.name] = {
        value: input.defaultValue,
        touched: false,
        validationError: null
      }
      return result
    }, {})
  }

  const reducer = (state = defaultState, action) => {
    switch(action.type) {
      case resetForm:
        return {
          ...defaultState
        }
      case validationError:
        var { name, errorMessage } = action.payload
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [name]: {
              ...state.inputs[name],
              validationError: errorMessage
            }
          }
        }
      case changeFormValue:
        var { name, value } = action.payload
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [name]: {
              touched: true,
              value: value,
              validationError: null
            }
          }
        }
      case submit:
        return {
          ...state,
          loading: true,
          loaded: false,
          error: null
        }
      case submitSucceed:
        return {
          ...state,
          loading: false,
          loaded: true,
          error: null
        }
      case submitFailed:
        return {
          ...state,
          loading: false,
          loaded: false,
          error: action.payload.error
        }
      default:
        return state
    }
  }

  return reducer
}
