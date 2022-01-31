import { createUseStyles } from "react-jss";

export const cssVariables = {
  colorPrimary: "#1C1C1E",
  colorSecondary: "#8E8E93",
  colorBlue: "#0A84FF",
  colorAccent: "#30D158",
  colorBullish: "#16c784",
  colorBearish: "#EA3943",
  colorGray9: "#F4F6F9",
  colorDivider: "#F6F7F9",
};

export const useAppStyles = createUseStyles({
  app: {
    height: "180vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: cssVariables.colorPrimary,
  },
  hashtag: {
    cursor: "pointer",
    color: cssVariables.colorBlue,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  descripition: {
    maxWidth: "450px",
    textAlign: "center",
  },
});
