export const ROOT_URL = 'http://localhost:8888'

export const CONNECTION_ERROR_MESSAGE = {
  message: "Something went wrong and it seems that our server is currently offline, we are sorry."
}

export const injectMimeHeaders = (headers) => {
  headers.append('Content-Type', `application/json`);
  return headers;
}

export const sendRequest = (url, config) => {
  url = ROOT_URL + url

  let { headers } = config;
  headers = injectMimeHeaders(headers ? headers : new Headers());

  return new Promise((resolve, reject) => {

    const throwConnectionError = (error) => {
      console.error('API Error has occured: ', error)
      reject(CONNECTION_ERROR_MESSAGE)
    }

    fetch(url, {
      ...config,
      headers
    }).then(response => {
      if ( response.status < 200 || response.status > 299 ) {
        // The server should still provide JSON response with an error message.
        response.json().then(reject).catch(throwConnectionError)
      } else {
        response.json().then(resolve).catch(throwConnectionError)
      }
    }).catch(throwConnectionError)
  })
}
