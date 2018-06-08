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
    page: state.page,
    Pokemon,
    Search
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchPokemons: () =>
        fetchPokemons({
          REQUEST: FETCH_POKEMONS_REQUEST,
          SUCCESS: FETCH_POKEMONS_SUCCESS
        })(
          () =>
            fetch(`data:text/plain,${JSON.stringify(pokemons)}`) ||
            fetch(`https://pokeapi.co/api/v2/pokemon/?limit=784`)
        ),
      filterPokemons: filterPokemons(FILTER_POKEMONS)
    },
    dispatch
  )
}

function connectPage(Component) {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Component)
}

export default connectPage
