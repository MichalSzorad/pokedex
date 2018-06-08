import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import * as reducers from '../reducers'
import { combineReducers } from 'redux'

export default function configureStore(initialState = {}) {
  const middlewares = [thunkMiddleware]

  if (process.env.NODE_ENV === 'development') {
    const loggerMiddleware = createLogger()
    middlewares.push(loggerMiddleware)
  }

  return createStore(
    combineReducers(reducers),
    initialState,
    compose(applyMiddleware(...middlewares))
  )
}
