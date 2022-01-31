import React from "react";
import { useSelector } from "react-redux";

import {
  Popup,
  PopupSkeleton,
  StatisticsInfo,
  Ticker,
  StatisticsInfoItem,
  Spacing,
} from "./components";
import { RootState } from "../../store";

interface IPriceStatisticsPopup {
  ticker: string;
}

function PriceStatisticsPopup(props: IPriceStatisticsPopup) {
  const { ticker } = props;

  const { isFetchingStats, tokenInfo } = useSelector(
    ({ crypto }: RootState) => ({
      isFetchingStats: crypto.isFetchingStats,
      tokenInfo: crypto.cryptoListStats[ticker.toLowerCase()],
    })
  );

  // Slice the most recent 12 data because the interval is 5 minutes, 5 x 12 = 1 hour
  const priceDataLastHour = !tokenInfo
    ? undefined
    : tokenInfo.historicalData.prices.slice(-12).map(([x, y], index) => ({
        name: `d-${index + 1}`,
        date: x,
        value: y,
      }));
  const priceChangePercentage_1hr = !priceDataLastHour
    ? undefined
    : (priceDataLastHour[priceDataLastHour.length - 1].value /
        priceDataLastHour[0].value -
        1) *
      100;

  return (
    <Popup className={!isFetchingStats && tokenInfo ? "loaded" : ""}>
      <PopupSkeleton className={isFetchingStats ? "visible" : ""}>
        <div className={"shine"} />
        <div className="text">Loading...</div>
      </PopupSkeleton>
      {tokenInfo && (
        <>
          <div className="name-section">
            <span className="logo">
              <img alt={tokenInfo.name} src={tokenInfo.image} />
            </span>
            <div className="name">
              <span>{tokenInfo.name}</span>
              <Ticker>{ticker.toUpperCase()}</Ticker>
            </div>
          </div>
          <StatisticsInfo>
            <Spacing />
            <StatisticsInfoItem
              label={"Price"}
              value={`$${tokenInfo.current_price.toFixed(2)}`}
            />
            <Spacing />
            <StatisticsInfoItem
              label={"Price Change"}
              interval={"24h"}
              value={`$${tokenInfo.price_change_24h.toFixed(2)}`}
              percentageUpDown={tokenInfo.price_change_percentage_24h}
            />
            <Spacing />
            <StatisticsInfoItem
              label={"24h Low / 24h High"}
              value={`$${tokenInfo.low_24h.toFixed(2)} /`}
              value2={`$${tokenInfo.high_24h.toFixed(2)}`}
            />
            <Spacing />
            <StatisticsInfoItem
              label={"Trading Volume"}
              interval={"24h"}
              value={`$${tokenInfo.total_volume}`}
              /* Require api to get trading volume percentage difference */
              // percentageUpDown={-17.94}
            />
            <Spacing />
            <StatisticsInfoItem
              label={"Price change in the last hour"}
              historicalData={priceDataLastHour}
              percentageUpDown={priceChangePercentage_1hr}
            />
          </StatisticsInfo>
        </>
      )}
    </Popup>
  );
}

export default PriceStatisticsPopup;
