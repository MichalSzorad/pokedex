import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Page from './containers/Page'
import './style/main.css'
import configureStore from './store/configureStore'

// store setup
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import * as reducers from './reducers'
import { combineReducers } from 'redux'

const middlewares = [
  thunkMiddleware,
  process.env.NODE_ENV === 'development' && createLogger()
].filter(Boolean)

const store = configureStore(
  createStore,
  applyMiddleware,
  compose,
  middlewares,
  combineReducers,
  reducers
)({})

render(
  <Provider store={store}>
    <Page />
  </Provider>,
  document.getElementById('root')
)
