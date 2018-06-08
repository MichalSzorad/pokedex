import pokemons from './pokemons'

function connectPokemonSearch(
  connect,
  bindActionCreators,
  actionTypes,
  actions,
  components
) {
  return Component => {
    return connect(
      mapStateToProps,
      mapDispatchToProps(bindActionCreators, actions, actionTypes),
      mergeProps(components)
    )(Component)
  }
}

function mapStateToProps(state) {
  return {
    isFetched: state.page.isFetched,
    pokemons: state.page.displayedPokemons
  }
}

function mapDispatchToProps(
  bindActionCreators,
  { fetchPokemons, filterPokemons },
  { FETCH_POKEMONS_REQUEST, FETCH_POKEMONS_SUCCESS, FILTER_POKEMONS }
) {
  return dispatch => {
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
}

function mergeProps(components) {
  return (stateProps, dispatchProps) => {
    return {
      onMount: () =>
        dispatchProps
          .fetchPokemons()
          .then(() => dispatchProps.filterPokemons('')),
      search: dispatchProps.filterPokemons,
      ...stateProps,
      ...components
    }
  }
}

export default connectPokemonSearch
