export default function configureStore(
  createStore,
  applyMiddleware,
  compose,
  middlewares,
  combineReducers,
  reducers
) {
  return function(initialState = {}) {
    return createStore(
      combineReducers(reducers),
      initialState,
      compose(applyMiddleware(...middlewares))
    )
  }
}
