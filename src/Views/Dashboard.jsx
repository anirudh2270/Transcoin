/* eslint-disable import/namespace */
import React from 'react';
import Transitions from '../Components/Motion.jsx';
import { Crypto_cards } from '../Components/Crypto_cards.jsx';
import { useCurrency_pairsQuery } from '../Services/apiSlice.jsx';
import Page_header from '../Components/Page_header.jsx';

export default function Dashborad() {
  const binance_pairs = useCurrency_pairsQuery();

  return (
    <Transitions>
      <Page_header page_name={'Dashboard'} />
      <div className=''>
        <Crypto_cards binance_pairs={binance_pairs} />
      </div>
    </Transitions>
  );
}
