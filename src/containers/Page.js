import React, { Component } from 'react'
import T from 'prop-types'

class Page extends Component {
  static propTypes = {
    isFetched: T.bool.isRequired,
    onMount: T.func.isRequired,
    Pokemon: T.func.isRequired,
    pokemons: T.array.isRequired,
    search: T.func.isRequired,
    Search: T.func.isRequired
  }

  componentDidMount() {
    this.props.onMount()
  }

  handleSearch(event) {
    this.props.search(event.target.value)
  }

  render() {
    const { Pokemon, Search, isFetched, pokemons } = this.props

    const pokemonList = pokemons.map((pokemon, index) => {
      return (
        <li className="pokemons__item" key={index}>
          <Pokemon pokemon={pokemon} key={index} />
        </li>
      )
    })

    return (
      <div className="page">
        <Search onChange={this.handleSearch.bind(this)} />
        <ul className="pokemons">
          {isFetched ? <p>Loading...</p> : pokemonList}
        </ul>
      </div>
    )
  }
}

export default Page
