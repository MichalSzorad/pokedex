import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Pokemon from '../components/Pokemon'
import Search from '../components/Search'
import * as pageActions from '../actions/PageActions'
import {
  FETCH_POKEMONS_REQUEST,
  FETCH_POKEMONS_SUCCESS,
  FILTER_POKEMONS
} from '../constants/Page'

class Page extends Component {
  componentDidMount() {
    this.props.pageActions
      .fetchPokemons({
        REQUEST: FETCH_POKEMONS_REQUEST,
        SUCCESS: FETCH_POKEMONS_SUCCESS
      })(() => fetch(`https://pokeapi.co/api/v2/pokemon/?limit=784`))
      .then(() => {
        this.props.pageActions.filterPokemons(FILTER_POKEMONS)('')
      })
  }

  handleSearch(event) {
    this.props.pageActions.filterPokemons(FILTER_POKEMONS)(event.target.value)
  }

  render() {
    let { displayedPokemons, isFetched } = this.props.page

    let pokemons = displayedPokemons.map((pokemon, index) => {
      return (
        <li className="pokemons__item">
          <Pokemon pokemon={pokemon} key={index} />
        </li>
      )
    })

    return (
      <div className="page">
        <Search onChange={this.handleSearch.bind(this)} />
        <ul className="pokemons">{isFetched ? <p>Loading...</p> : pokemons}</ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    page: state.page
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page)
