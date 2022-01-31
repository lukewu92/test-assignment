import { createStore, applyMiddleware, compose } from 'redux'
import createRootReducer from './reducers'
import sagaMiddleware from './saga-middleware'

let composeEnhancers = compose

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware)
)

const store = createStore(createRootReducer(), enhancer)

export type RootState = ReturnType<typeof store.getState>

export default store
