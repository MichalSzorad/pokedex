import { combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import configureStore from '../store/configureStore'
import { createPageReducer } from '../reducers'
import {
  FETCH_POKEMONS_REQUEST,
  FETCH_POKEMONS_SUCCESS,
  FILTER_POKEMONS
} from '../constants/Page'

const middlewares = [
  thunkMiddleware,
  process.env.NODE_ENV === 'development' && createLogger()
].filter(Boolean)

const reducers = {
  page: createPageReducer(
    {
      isFetched: false,
      pokemons: [],
      displayedPokemons: []
    },
    {
      REQUEST: FETCH_POKEMONS_REQUEST,
      SUCCESS: FETCH_POKEMONS_SUCCESS,
      FILTER: FILTER_POKEMONS
    }
  )
}

const store = configureStore(
  createStore,
  applyMiddleware,
  compose,
  middlewares,
  combineReducers,
  reducers
)({})
export default store
