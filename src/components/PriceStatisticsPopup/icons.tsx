import React from "react";
import styled from "styled-components";

interface IArrow extends React.HTMLAttributes<HTMLOrSVGElement> {
  down?: boolean;
}

export const Arrow = styled(({ down = false, className, ...rest }: IArrow) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className}${down ? " down" : ""}`}
    {...rest}
  >
    <path d="M2.15156 8.48437L9.84845 8.48438C10.0793 8.48438 10.2082 8.24063 10.0652 8.07422L6.21681 3.61172C6.10665 3.48398 5.89454 3.48398 5.78321 3.61172L1.93477 8.07422C1.7918 8.24063 1.9207 8.48437 2.15156 8.48437Z" />
  </svg>
))`
  fill: inherit;
  transition: all 0.3s ease;
  &.down {
    transform: rotate(180deg);
  }
  path {
    fill: inherit;
  }
`;
