import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Pokemon from '../components/Pokemon'
import Search from '../components/Search'
import pokemons from './pokemons.json'
import { fetchPokemons, filterPokemons } from '../actions/PageActions'
import {
  FETCH_POKEMONS_REQUEST,
  FETCH_POKEMONS_SUCCESS,
  FILTER_POKEMONS
} from '../constants/Page'

function mapStateToProps(state) {
  return {
    isFetched: state.page.isFetched,
    pokemons: state.page.displayedPokemons
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchPokemons: () =>
        fetchPokemons({
          REQUEST: FETCH_POKEMONS_REQUEST,
          SUCCESS: FETCH_POKEMONS_SUCCESS
        })(() => fetch(`data:text/plain,${JSON.stringify(pokemons)}`)),
      filterPokemons: filterPokemons(FILTER_POKEMONS)
    },
    dispatch
  )
}

function mergeProps(stateProps, dispatchProps) {
  return {
    onMount: () =>
      dispatchProps
        .fetchPokemons()
        .then(() => dispatchProps.filterPokemons('')),
    search: dispatchProps.filterPokemons,
    ...stateProps,
    Pokemon,
    Search
  }
}

function connectPage(Component) {
  return connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(Component)
}

export default connectPage
