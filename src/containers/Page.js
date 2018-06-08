import React, { Component } from 'react'
import connectPage from '../hoc/connect-page'
import T from 'prop-types'

class Page extends Component {
  static propTypes = {
    fetchPokemons: T.func.isRequired,
    filterPokemons: T.func.isRequired,
    Pokemon: T.func.isRequired,
    Search: T.func.isRequired
  }

  componentDidMount() {
    this.props.fetchPokemons().then(() => this.props.filterPokemons(''))
  }

  handleSearch(event) {
    this.props.filterPokemons(event.target.value)
  }

  render() {
    let { displayedPokemons, isFetched } = this.props.page
    const { Pokemon, Search } = this.props

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

export default connectPage(Page)
