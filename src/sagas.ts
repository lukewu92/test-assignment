import { all } from 'redux-saga/effects'
import { sagas as cryptoSaga } from './redux/crypto'

// Main Saga
export default function* rootSaga() {
  yield all([
    ...cryptoSaga
  ])
}
