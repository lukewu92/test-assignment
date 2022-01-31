import { combineReducers } from 'redux'

import { reducers as cryptoReducers } from './redux/crypto'

const createRootReducer = () =>
  combineReducers({
    ...cryptoReducers
  })

export default createRootReducer
