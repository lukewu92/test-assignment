import React from "react";
import styled from "styled-components";
import {
  YAxis,
  Area,
  ResponsiveContainer,
  AreaChart,
} from "recharts";

import { cssVariables } from "../../hooks/useStyles";
import { Arrow } from "./icons";

export const Popup = styled.div`
  width: 100px;
  height: auto;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0px 3px 10px 0px rgb(27 27 29 / 20%);
  position: relative;
  animation: fadeScaleIn 0.3s ease forwards;
  max-width: 100px;
  max-height: 50px;
  transition: all 0.3s ease;
  overflow: hidden;
  &.loaded {
    width: 440px;
    max-width: 100%;
    max-height: 700px;
    max-width: calc(100vw - 24px);
  }
  .name-section {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
  }
  .name-section .name {
    font-size: 28px;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 6px;
  }
  .name-section .logo {
    width: 60px;
    height: 60px;
    border-radius: 100px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 6px; 
  }
  .logo img {
    width: 100%;
    height: auto;
  }
`;

export const StatisticsInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ChartContainer = styled.div`
  width: 100%;
  height: 120px;
  background: ${cssVariables.colorGray9};
  border-radius: 10px;
  padding: 8px;
  box-sizing: border-box;
`;

interface IStatisticsInfoItem extends React.HTMLAttributes<HTMLDivElement> {
  interval?: string;
  label: string;
  value?: string;
  value2?: string;
  percentageUpDown?: number;
  historicalData?: { date: number; value: number }[];
}

export const StatisticsInfoItem = styled(
  ({
    className,
    label,
    interval,
    value,
    value2,
    percentageUpDown,
    historicalData,
    ...rest
  }: IStatisticsInfoItem) => (
    <>
      <div className={`${className}`} {...rest}>
        <div className="labels">
          <span className="label">{label}</span>
          {interval && <Ticker className="interval">{interval}</Ticker>}
        </div>
        <div className={`values`}>
          {value && <span className="value">{value}</span>}
          {value2 && <span className="value">{value2}</span>}
          {percentageUpDown && <UpDownStats percent={percentageUpDown} />}
        </div>
      </div>
      {historicalData &&
        (() => {
          // There's no real number bigger than plus Infinity
          let lowest = Number.POSITIVE_INFINITY;
          let highest = Number.NEGATIVE_INFINITY;
          for (let i = historicalData.length - 1; i >= 0; i--) {
            const tmp = historicalData[i].value;
            if (tmp < lowest) lowest = tmp;
            if (tmp > highest) highest = tmp;
          }

          const color = !percentageUpDown ? cssVariables.colorBlue : percentageUpDown > 0 ? cssVariables.colorBullish : cssVariables.colorBearish

          return (
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart width={300} height={100} data={historicalData}>
                  <defs>
                    <linearGradient
                      id="colorHistorical"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                      <stop offset="95%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <YAxis
                    width={0}
                    visibility={0}
                    type="number"
                    dataKey="value"
                    domain={[lowest, highest]}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    min={lowest}
                    max={highest}
                    stroke={color}
                    fillOpacity={1}
                    fill="url(#colorHistorical)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          );
        })()}
    </>
  )
)`
  width: 100%;
  box-sizing: border-box;
  padding: 16px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  .label {
    color: ${cssVariables.colorSecondary};
    font-size: 14px;
    font-weight: 500;
  }
  .labels {
    display: flex;
    flex-direction: row;
    gap: 4px;
  }
  .value {
    font-size: 16px;
    font-weight: 500;
  }
  .values {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    gap: 2px;
  }
  .values.historical-data {
    height: 52px;
    width: 172px;
    border-radius: 10px;
    background: ${cssVariables.colorGray9};
  }
`;

enum SpacingSize {
  small = "8px",
  medium = "16px",
  large = "24px",
}

interface ISpacing extends React.HTMLAttributes<HTMLDivElement> {
  size?: SpacingSize;
}

export const Spacing = styled(
  ({ className, size = SpacingSize.small, ...rest }: ISpacing) => (
    <div className={`${className}`} style={{ height: size }} {...rest}>
      <span className="line" />
    </div>
  )
)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 6px;
  .line {
    background: ${cssVariables.colorDivider};
    border-radius: 10px;
    width: 100%;
    height: 1px;
  }
`;

interface IUpDownStats extends React.HTMLAttributes<HTMLDivElement> {
  percent: number;
}

export const UpDownStats = styled(
  ({ className, percent, ...rest }: IUpDownStats) => (
    <div
      className={`${className}`}
      style={{
        color:
          percent < 0 ? cssVariables.colorBearish : cssVariables.colorBullish,
        fill:
          percent < 0 ? cssVariables.colorBearish : cssVariables.colorBullish,
      }}
      {...rest}
    >
      <Arrow down={percent < 0 ? true : false} />
      <span className="percent-value">{`${percent.toFixed(2)}%`}</span>
    </div>
  )
)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .percent-value {
    color: inherit;
    font-size: 14px;
    font-weight: 600;
  }
`;

export const Ticker = styled.div`
  background: ${cssVariables.colorGray9};
  color: ${cssVariables.colorSecondary};
  box-sizing: border-box;
  padding: 6px 12px;
  border-radius: 10px;
  font-size: 22px;
  font-weight: normal;
  &.interval {
    padding: 2px 4px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 500;
  }
`;

export const PopupSkeleton = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: inherit;
  &.visible {
    pointer-events: auto;
    opacity: 1;
  }
  &.visible > *.text {
    z-index: 2;
    animation: fadeInOutPartial 2.2s infinite ease forwards;
  }
  &.visible .shine {
    animation: shine 1.6s linear infinite;
  }
  .shine {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
    background: linear-gradient(
      to right,
      #ffffff00 30%,
      ${cssVariables.colorGray9} 50%,
      #ffffff00 70%
    );
    background-size: 200% auto;
  }
  @keyframes shine {
    0%,
    50% {
      background-position: 150% center;
    }
    100% {
      background-position: -50% center;
    }
  }
`;
