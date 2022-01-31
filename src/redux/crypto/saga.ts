import { put, call, takeEvery, fork } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import {
  getCryptoStats,
  getCryptoStatsSuccess,
  getCryptoStatsFailure,
} from "./slice";
import { GetCryptoStatsAction } from "./types";
import {
  getCryptoMarketData,
  getCryptoHistoricalData,
  getCryptoName,
} from "./api";

export function* getCryptoStatsHandler(
  action: PayloadAction<GetCryptoStatsAction>
) {
  try {
    const payloadProps = action.payload;
    const cryptoName: string = yield call(getCryptoName, payloadProps.ticker);
    const cryptoMarketData = yield call(
      getCryptoMarketData,
      cryptoName.toLowerCase()
    );
    
    const latestHistoricalData = yield call(getCryptoHistoricalData, cryptoName.toLowerCase());
    const cryptoStats = {
      ...cryptoMarketData[0],
      historicalData: latestHistoricalData
    };

    yield put(getCryptoStatsSuccess(cryptoStats))
  } catch (e) {
    yield put(getCryptoStatsFailure());
  }
}

function* watchGetCryptoStats() {
  yield takeEvery(getCryptoStats.toString(), getCryptoStatsHandler);
}

const cryptoSaga = [fork(watchGetCryptoStats)]

export default cryptoSaga