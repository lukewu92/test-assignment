import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ICryptoState,
  GetCryptoStatsAction,
  GetCryptoStatsActionSuccessAction,
} from "./types";

export const initialState: ICryptoState = {
  isFetchingStats: false,
  cryptoListStats: {},
};

export const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    getCryptoStats: (state, action: PayloadAction<GetCryptoStatsAction>) => {
      state.isFetchingStats = true;
    },
    getCryptoStatsSuccess: (
      state,
      action: PayloadAction<GetCryptoStatsActionSuccessAction>
    ) => {
      const stats = action.payload;
      state.isFetchingStats = false;
      state.cryptoListStats = {
        ...state.cryptoListStats,
        [stats.symbol]: { ...stats },
      };
    },
    getCryptoStatsFailure: (state) => {
      state.isFetchingStats = false;
    },
  },
});

export const { getCryptoStats, getCryptoStatsSuccess, getCryptoStatsFailure } =
  cryptoSlice.actions;

export default cryptoSlice.reducer;
