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
import { combineReducers } from 'redux'

// reducers
import { createPageReducer } from './reducers'
import connectPage from './hoc/connect-page'

// connectors
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Pokemon from './components/Pokemon'
import Search from './components/Search'
import { fetchPokemons, filterPokemons } from './actions/PageActions'
import {
  FETCH_POKEMONS_REQUEST,
  FETCH_POKEMONS_SUCCESS,
  FILTER_POKEMONS
} from './constants/Page'

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

render(
  <Provider store={store}>
    {React.createElement(
      connectPage(
        connect,
        bindActionCreators,
        { FETCH_POKEMONS_REQUEST, FETCH_POKEMONS_SUCCESS, FILTER_POKEMONS },
        { fetchPokemons, filterPokemons },
        { Search, Pokemon }
      )(Page)
    )}
  </Provider>,
  document.getElementById('root')
)
