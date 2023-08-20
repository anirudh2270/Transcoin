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

      {/* top cards */}
      <div className=''>
        <Crypto_cards binance_pairs={binance_pairs} />
      </div>

      {/* history */}
      <div className='my-10 flex gap-8 flex-wrap'>
        <div className=' flex-auto w-[60%]'>
          <div className='flex justify-between items-center flex-wrap'>
            <h3 className='font-semibold text-zinc-400'>Transaction History</h3>
            <a href='' className='font-semibold text-sm text-[#F97791]'>
              View all
            </a>
          </div>

          <div className='bg-body_secondary w-full p-4 rounded-xl mt-4'>
            asdsad
          </div>
        </div>

        <div className='bg-white rounded-lg p-4 flex-auto'>
          <h3 className='font-semibold text-zinc-600'>Transaction History</h3>
        </div>
      </div>
    </Transitions>
  );
}
