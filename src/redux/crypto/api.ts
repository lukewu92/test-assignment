import axios from "axios";

import cryptocurrencies from "../../constants/cryptocurrencies.json";

// const apiKey = process.env.REACT_APP_CMC_TEST_API_KEY!;
// const apiEndpointUrl = process.env.REACT_APP_CMC_TEST_API_ENDPOINT_URL!;
const coingeckoEndpointUrl = process.env.REACT_APP_COINGECKO_API_ENDPOINT_URL!;

export function getCryptoName(ticker: string) {
  // Fetch from cryptocurrencies.json instead due to CORS restrictions.
  return cryptocurrencies[ticker.toUpperCase()];
  /*
    Coinmarketcap Alternative
  */
  // return axios
  //   .get(`${apiEndpointUrl}/v1/cryptocurrency/info`, {
  //     headers: { "X-CMC_PRO_API_KEY": apiKey },
  //     params: {
  //       symbol: ticker,
  //     },
  //     timeout: 4000,
  //   })
  //   .then((response: ICryptoInfo) => {
  //     return {
  //       name: response.data[ticker].name,
  //       logo: response.data[ticker].logo,
  //       id: response.data[ticker].id,
  //     };
  //   })
  //   .catch((error) => console.error("timeout exceeded"));
}

export function getCryptoMarketData(id: string) {
  return axios({
    method: "get",
    url: `${coingeckoEndpointUrl}/coins/markets`,
    timeout: 4000, // 4 seconds timeout
    params: {
      ids: id,
      vs_currency: "usd",
    },
  })
    .then((response) => response.data)
    .catch((error) => console.error("timeout exceeded"));

  /*
    Coinmarketcap Alternative
  */
  // return axios({
  //   method: "get",
  //   url: `${apiEndpointUrl}/v1/cryptocurrency/quotes/latest`,
  //   headers: {
  //     "X-CMC_PRO_API_KEY": apiKey,
  //   },
  //   timeout: 4000, // 4 seconds timeout
  //   data: {
  //     id: id,
  //   },
  // })
  //   .then((response) => response)
  //   .catch((error) => console.error("timeout exceeded"));
}

export function getCryptoHistoricalData(id: string) {
  return axios({
    method: "get",
    url: `${coingeckoEndpointUrl}/coins/${id}/market_chart`,
    timeout: 4000, // 4 seconds timeout
    params: {
      ids: id,
      vs_currency: "usd",
      days: 1,
    },
  })
    .then((response) => response.data)
    .catch((error) => console.error("timeout exceeded"));

  /*
    Coinmarketcap Alternative
  */
  // return axios({
  //   method: "get",
  //   url: `${apiEndpointUrl}/v1/cryptocurrency/quotes/historical`,
  //   headers: {
  //     "X-CMC_PRO_API_KEY": apiKey,
  //   },
  //   timeout: 4000, // 4 seconds timeout
  //   data: {
  //     id: id,
  //   },
  // })
  //   .then((response) => response)
  //   .catch((error) => console.error("timeout exceeded"));
}
