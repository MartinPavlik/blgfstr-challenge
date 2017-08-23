import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import createStore, { history } from './store/createStore'
import CenteredLayout from './components/layouts/CenteredLayout'
import App from './containers/app'

const target = document.getElementById('root')

const store = createStore()

export default function () {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <CenteredLayout>
          <App />
        </CenteredLayout>
      </ConnectedRouter>
    </Provider>
  )
}
