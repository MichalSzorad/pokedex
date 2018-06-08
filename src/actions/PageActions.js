function requestPokemons(actionType) {
  return {
    type: actionType
  }
}

function receivePokemons(actionType, json) {
  const pokemons = json.results.map(pokemon => {
    let { url } = pokemon
    pokemon.id = url.substring(34, url.length - 1)

    return pokemon
  })

  return {
    type: actionType,
    pokemons
  }
}

export function fetchPokemons(download, { REQUEST, SUCCESS }) {
  return dispatch => {
    dispatch(requestPokemons(REQUEST))

    return download()
      .then(response => response.json())
      .then(json => {
        dispatch(receivePokemons(SUCCESS, json))
      })
  }
}

export function filterPokemons(actionType, searchTerm) {
  return (dispatch, getState) => {
    const displayedPokemons = getState()
      .page.pokemons.filter(pokemon => {
        return pokemon.name.includes(searchTerm.toLowerCase())
      })
      .slice(0, 60)

    dispatch({
      type: actionType,
      displayedPokemons
    })
  }
}
