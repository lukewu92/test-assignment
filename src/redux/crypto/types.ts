export type ICryptoStats = {
  ath: number
  ath_change_percentage: number
  ath_date: string
  atl: number
  atl_change_percentage: number
  atl_date: string
  circulating_supply: number
  current_price: 36935
  fully_diluated_valuation: number
  high_24h: number
  low_24h: number
  market_cap: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  market_cap_rank: number
  max_supply: number
  name: string
  price_change_24h: number
  price_change_percentage_24h: number
  symbol: string
  total_supply: number
  total_volume: number
  historicalData: {
    prices: [number, number][]
    market_caps: [number, number][]
    total_volumes: [number, number][]
  }
  id: string
  image: string
  last_updated: string
}

export interface ICryptoState {
  cryptoListStats: {
    [key: string]: ICryptoStats
  }
  isFetchingStats: boolean
}

export interface GetCryptoStatsAction {
  ticker: string
}

export interface GetCryptoStatsActionSuccessAction  extends ICryptoStats {}
