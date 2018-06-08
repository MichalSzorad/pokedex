import { fetchPokemons, filterPokemons } from '../PageActions'
describe('fetchPokemons', () => {
  it('Should be a function', () => {
    expect(typeof fetchPokemons).toBe('function')
  })

  it('Should not fail', async () => {
    const dispatch = jest.fn()
    const actionTypes = { REQUEST: 'FOO', SUCCESS: 'BAR' }
    const download = async () => ({
      json: async () => ({ results: [{ url: 'foo' }] })
    })
    await fetchPokemons(actionTypes)(download)(dispatch)

    expect(dispatch.mock.calls.length).toBe(2)
    expect(dispatch.mock.calls[0][0].type).toBe(actionTypes.REQUEST)
    expect(dispatch.mock.calls[1][0].type).toBe(actionTypes.SUCCESS)
  })
})

describe('filterPokemons', () => {
  it('Should be a function', () => {
    expect(typeof filterPokemons).toBe('function')
  })

  it('Should not fail', async () => {
    const dispatch = jest.fn()
    const getState = () => ({
      page: {
        pokemons: []
      }
    })
    const actionType = 'foo'
    const searchTerm = 'hello'
    await filterPokemons(actionType)(searchTerm)(dispatch, getState)

    expect(dispatch.mock.calls.length).toBe(1)
    expect(dispatch.mock.calls[0][0].type).toBe(actionType)
  })

  it('Should display only filtered pokemons', async () => {
    const dispatch = jest.fn()
    const getState = () => ({
      page: {
        pokemons: [
          { name: 'foo' },
          { name: 'bar' },
          { name: 'test' },
          { name: 'pikAchu' }
        ]
      }
    })
    const actionType = 'foo'
    const searchTerm = 'a'
    await filterPokemons(actionType)(searchTerm)(dispatch, getState)

    const expectedPokemonNames = ['bar', 'pikAchu']
    expect(
      dispatch.mock.calls[0][0].displayedPokemons
        .map(pokemon => pokemon.name)
        .join(',')
    ).toBe(expectedPokemonNames.join(','))
  })
})
