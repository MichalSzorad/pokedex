import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Pokemon from '../components/Pokemon'
import Search from '../components/Search'
import { fetchPokemons, filterPokemons } from '../actions/PageActions'
import {
  FETCH_POKEMONS_REQUEST,
  FETCH_POKEMONS_SUCCESS,
  FILTER_POKEMONS
} from '../constants/Page'
import connectPokemonSearch from '../hoc/connect-pokemon-search'

export default function connectPage(Component) {
  return connectPokemonSearch(
    connect,
    bindActionCreators,
    { FETCH_POKEMONS_REQUEST, FETCH_POKEMONS_SUCCESS, FILTER_POKEMONS },
    { fetchPokemons, filterPokemons },
    { Search, Pokemon }
  )(Component)
}
