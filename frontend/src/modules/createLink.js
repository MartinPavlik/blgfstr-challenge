import linkFormReducerFactory from './helpers/linkFormReducerFactory'

export const CREATE_LINK_REQUESTED = 'CREATE_LINK_REQUESTED'
export const CREATE_LINK_SUCCEED = 'CREATE_LINK_SUCCEED'
export const CREATE_LINK_FAILED = 'CREATE_LINK_FAILED'
export const RESET_FORM = 'CREATE_LINK_RESET_FORM'
export const CHANGE_FORM_VALUE = 'CREATE_LINK_CHANGE_FORM_VALUE'
export const VALIDATION_ERROR = 'CREATE_LINK_VALIDATION_ERROR'

export const reset = () => ({
  type: RESET_FORM
})

export const validationError = (name, errorMessage = null) => ({
  type: VALIDATION_ERROR,
  payload: {
    name,
    errorMessage
  }
})

export const changeValue = (name, value) => ({
  type: CHANGE_FORM_VALUE,
  payload: {
    name,
    value
  }
})

export const createLink = url => ({
  type: CREATE_LINK_REQUESTED,
  payload: url
})

export default linkFormReducerFactory({
  submit: CREATE_LINK_REQUESTED,
  submitSucceed: CREATE_LINK_SUCCEED,
  submitFailed: CREATE_LINK_FAILED,
  changeFormValue: CHANGE_FORM_VALUE,
  validationError: VALIDATION_ERROR,
  resetForm: RESET_FORM
}, [{
  name: 'url',
  defaultValue: ''
}])
