import reducer from './slice'
import sagas from './saga'

const reducers = {
  crypto: reducer
}

export { reducers, sagas }
