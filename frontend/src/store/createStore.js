import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from '../modules'
import createSagaMiddleware from 'redux-saga'

import rootSaga from '../sagas'

export const history = createHistory()

const sagaMiddleware = createSagaMiddleware()

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

const initialState = {}
const enhancers = []
const middleware = [
  thunk,
  routerMiddleware(history),
  sagaMiddleware
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }

  middleware.push(logger)
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

export default function(initialState = {}) {
  const store = createStore(rootReducer, initialState, composedEnhancers)

  sagaMiddleware.run(rootSaga)

  return store
}
