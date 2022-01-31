import React from "react";

import { useAppStyles } from "../hooks/useStyles";
import Hashtag from "../components/Hashtag";

export default function App() {
  const classes = useAppStyles();

  return (
    <div className={classes.app}>
      {/* <strong className={classes.hashtag}>#BTC</strong> */}
      <Hashtag text='BTC' />
      <p className={classes.descripition}>
        When a user hovers over the hashtag above, a pop up card showing the
        price statistics for Bitcoin should appear :)
      </p>
    </div>
  );
}
