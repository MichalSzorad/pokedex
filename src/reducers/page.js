function createPageReducer(initialState, { REQUEST, SUCCESS, FILTER }) {
  return function page(state = initialState, action) {
    switch (action.type) {
      case REQUEST:
        return {
          ...state,
          isFetched: true
        }

      case SUCCESS:
        const { pokemons } = action

        return {
          ...state,
          pokemons,
          isFetched: false
        }

      case FILTER:
        const { displayedPokemons } = action

        return {
          ...state,
          displayedPokemons
        }

      default:
        return state
    }
  }
}

export default createPageReducer
