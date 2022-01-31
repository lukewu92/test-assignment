import React, { useState } from "react";
import { Popover } from "react-tiny-popover";
import { useDispatch } from "react-redux";

import { useAppStyles } from "../../hooks/useStyles";
import PriceStatisticsPopup from "../PriceStatisticsPopup";
import { getCryptoStats } from '../../redux/crypto/slice'

interface IHashtag {
  text: string;
}

function HashTag({ text }: IHashtag) {
  const dispatch = useDispatch()
  const classes = useAppStyles();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  function fetchCryptoStats () {
    dispatch(getCryptoStats({ ticker: text }))
    setIsPopoverOpen(true)
  }

  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={["top", "left"]}
      padding={10}
      reposition={false}
      content={() => <PriceStatisticsPopup ticker={text} />}
      // onClickOutside={() => setIsPopoverOpen(false)}
    >
      <a className={classes.hashtag} href={`https://app.alphaimpact.fi/mvp/search/${text}/tags`}>
        <strong
          onMouseOver={fetchCryptoStats}
          onMouseLeave={() => setIsPopoverOpen(false)}
        >{`#${text}`}</strong>
      </a>
    </Popover>
  );
}

export default HashTag;
