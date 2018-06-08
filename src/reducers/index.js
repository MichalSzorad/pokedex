import createPageReducer from './page'
import {
  FETCH_POKEMONS_REQUEST,
  FETCH_POKEMONS_SUCCESS,
  FILTER_POKEMONS
} from '../constants/Page'

export const page = createPageReducer(
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
