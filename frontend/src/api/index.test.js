import { sendRequest, CONNECTION_ERROR_MESSAGE } from './index'

const mockResponse = (status, statusText, response) => {
  return new window.Response(response, {
    status: status,
    statusText: statusText,
    headers: {
      'Content-type': 'application/json'
    }
  })
}

it('successfully converts JSON response to JSON object', () => {
  const json = { message: 'test' }
  window.fetch = () => Promise.resolve(mockResponse(200, null, JSON.stringify(json)))
  return expect(sendRequest('/links', { method: 'GET' })).resolves.toEqual(json)
})

it('returns rejected promise with JSON object when API call fails (but API served JSON)', () => {
  const json = { message: 'test' }
  window.fetch = () => Promise.resolve(mockResponse(400, null, JSON.stringify(json)))
  return expect(sendRequest('/links', { method: 'GET' })).rejects.toEqual(json)
})

it('returns rejected promise with connection error when API fails completely', () => {
  window.fetch = () => Promise.reject()
  return expect(sendRequest('/links', { method: 'GET' })).rejects.toEqual(CONNECTION_ERROR_MESSAGE)
})
