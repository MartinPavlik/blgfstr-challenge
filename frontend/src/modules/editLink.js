import linkFormReducerFactory from './helpers/linkFormReducerFactory'

export const EDIT_LINK_REQUESTED = 'EDIT_LINK_REQUESTED'
export const EDIT_LINK_SUCCEED = 'EDIT_LINK_SUCCEED'
export const EDIT_LINK_FAILED = 'EDIT_LINK_FAILED'
export const RESET_FORM = 'EDIT_LINK_RESET_FORM'
export const CHANGE_FORM_VALUE = 'EDIT_LINK_CHANGE_FORM_VALUE'
export const VALIDATION_ERROR = 'EDIT_LINK_VALIDATION_ERROR'

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

export const editLink = (managementHash, url) => ({
  type: EDIT_LINK_REQUESTED,
  payload: {
    url,
    managementHash
  }
})

export const inputs = [
  {
    name: 'url',
    defaultValue: ''
  }
]


export default linkFormReducerFactory({
  submit: EDIT_LINK_REQUESTED,
  submitSucceed: EDIT_LINK_SUCCEED,
  submitFailed: EDIT_LINK_FAILED,
  changeFormValue: CHANGE_FORM_VALUE,
  validationError: VALIDATION_ERROR,
  resetForm: RESET_FORM
}, inputs)
