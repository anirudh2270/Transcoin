import React, { useState, memo } from 'react';
// eslint-disable-next-line import/namespace
import { ErrorBoundary } from 'react-error-boundary';
import Crypto_cards_skelton from '../Loading_Skeletons/Crypto_cards_skelton.jsx';
import { motion } from 'framer-motion';
import loadable from '@loadable/component';
import { useSelector, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';
const Pair_search = loadable(() => import('../Components/Pairs_search.jsx'));

export const Data_card = memo(function Data_card({
  data,
  index,
  update_Selected_pairs,
  binance_pairs = [],
}) {
  const balance = useSelector(
    (state) => state.Asset_balance.data[data.replace('USDT', '')],
    shallowEqual
  );

  const live_data = useSelector(
    (state) => state.Prices.data[data],
    shallowEqual
  );

  let [IsHover, set_IsHover] = useState(false);

  return (
    <div className='relative'>
      {live_data ? (
        <div
          id='dashbord_crypto_cards'
          onMouseEnter={() => set_IsHover(true)}
          onMouseLeave={() => set_IsHover(false)}
          className={`py-4 pb-7 bg-body_secondary w-full ease-in-out transition-all duration-300 rounded-2xl  text-center   ${
            IsHover
              ? 'drop-shadow-2xl h-[auto] absolute z-[999]'
              : 'h-[6rem] relative overflow-hidden'
          }`}
        >
          {/* card header */}
          <div className='flex gap-3 justify-between  items-center px-5'>
            <span className='font-semibold text-left text-lg'>
              <Pair_search
                update_Selected_pairs={update_Selected_pairs}
                baseAsset={live_data?.symbol.replace('USDT', '')}
                index={index}
                binance_pairs={binance_pairs}
              />
            </span>
            <div className='absolute right-0'>
              <motion.img
                initial={{
                  x: '50px',
                }}
                animate={{
                  x: IsHover ? '-20px' : '-20px',
                  y: IsHover ? '27px' : '17px',
                  height: IsHover ? '5rem' : '3.3rem',
                  width: IsHover ? '5rem' : '3.3rem',
                }}
                transition={{ duration: 0.6, delay: 0 }}
                src={`/crypto_icons/${live_data.symbol
                  .replace('USDT', '')
                  .toLowerCase()}.png`}
                onError={(e) => {
                  e.currentTarget.src = '/crypto_icons/not_found.png';
                }}
                alt='Logo'
                className=' drop-shadow-lg'
              />
            </div>
          </div>

          {/* stats section */}
          <div
            className={`${
              IsHover ? 'bg-zinc-100 dark:bg-[#2b2b2b]  mt-2' : ''
            } p-5 pt-0`}
          >
            <div className='text-start font-semibold'>
              <motion.h6
                className='text-sm text-zinc-500'
                initial={{ opacity: 0, y: '0px' }}
                animate={{
                  opacity: IsHover ? 1 : 0,
                  y: IsHover ? '15px' : '5px',
                }}
                transition={{ duration: 0.2, delay: 0 }}
              >
                Last Price
              </motion.h6>

              <motion.h2
                className='my-1 font-bold'
                initial={{ y: '-20px' }}
                animate={{ y: IsHover ? '15px' : '-20px' }}
              >
                {live_data.lastPrice ? (
                  <span className={`${IsHover ? '' : ' text-[#808080] '}`}>
                    <span
                      className={`text-base ${
                        IsHover ? '' : ' text-[#808080] '
                      }`}
                    >
                      $
                    </span>
                    {Number(live_data.lastPrice).toFixed(2)}
                  </span>
                ) : (
                  <div className='animate-pulse my-3'>
                    <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5' />
                    <div className='w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700' />
                  </div>
                )}
              </motion.h2>
            </div>

            <div className='flex flex-wrap justify-between items-center gap-5 my-4 text-start font-semibold'>
              <div>
                <motion.h6
                  className='text-sm text-zinc-500'
                  initial={{ opacity: 0, y: '0px' }}
                  animate={{
                    opacity: IsHover ? 1 : 0,
                    y: IsHover ? '15px' : '5px',
                  }}
                  transition={{ duration: 0.2, delay: 0 }}
                >
                  24h Change
                </motion.h6>

                <motion.h2
                  className={`${
                    Number(live_data.priceChangePercent) < 0
                      ? 'text-danger'
                      : 'text-success'
                  }  text-base font-bold`}
                  initial={{ y: '-20px' }}
                  animate={{
                    y: IsHover ? '15px' : '-20px',
                    opacity: IsHover ? 1 : 0,
                  }}
                >
                  {live_data.priceChangePercent} %
                </motion.h2>
              </div>

              <div>
                <motion.h6
                  className='text-sm text-zinc-500'
                  initial={{ opacity: 0, y: '0px' }}
                  animate={{
                    opacity: IsHover ? 1 : 0,
                    y: IsHover ? '15px' : '5px',
                  }}
                  transition={{ duration: 0.2, delay: 0 }}
                >
                  24h Volume
                </motion.h6>

                <motion.h2
                  className='text-base font-bold'
                  initial={{ y: '-20px' }}
                  animate={{
                    y: IsHover ? '15px' : '-20px',
                    opacity: IsHover ? 1 : 0,
                  }}
                >
                  {Number(live_data.volume).toFixed(2) + ' B'}
                </motion.h2>
              </div>
            </div>
          </div>

          {/* assets info */}
          <div className='flex px-5 flex-wrap justify-between items-center gap-5 my-2 text-start font-semibold'>
            <div>
              <motion.h6
                className='text-sm text-zinc-500'
                initial={{ opacity: 0, y: '0px' }}
                animate={{
                  opacity: IsHover ? 1 : 0,
                  y: IsHover ? '15px' : '5px',
                }}
                transition={{ duration: 0.2, delay: 0 }}
              >
                Free Amount
              </motion.h6>

              <motion.h2
                className={`text-base font-bold`}
                initial={{ y: '-20px' }}
                animate={{
                  y: IsHover ? '15px' : '-20px',
                  opacity: IsHover ? 1 : 0,
                }}
              >
                {balance ? balance.free : 0}
              </motion.h2>
            </div>

            <div>
              <motion.h6
                className='text-sm text-zinc-500'
                initial={{ opacity: 0, y: '0px' }}
                animate={{
                  opacity: IsHover ? 1 : 0,
                  y: IsHover ? '15px' : '5px',
                }}
                transition={{ duration: 0.2, delay: 0 }}
              >
                Locked Amount
              </motion.h6>

              <motion.h2
                className='text-base font-bold'
                initial={{ y: '-20px' }}
                animate={{
                  y: IsHover ? '15px' : '-20px',
                  opacity: IsHover ? 1 : 0,
                }}
              >
                {balance ? balance.locked : 0}
              </motion.h2>
            </div>
          </div>

          {/* actions */}
          <div className='flex gap-3 items-center relative bottom-[-45px] justify-end right-4'>
            <Link
              to='/despote'
              className='hover:scale-110 hover:drop-shadow-2xl transition-all ease-in-out duration-200'
            >
              <img
                src='/img/deposit.png'
                className='drop-shadow-xl rounded-full border'
                width={40}
                alt=''
              />
            </Link>
            <Link
              to='/despote'
              className='hover:scale-110 hover:drop-shadow-2xl transition-all ease-in-out duration-200'
            >
              <img
                src='/img/deposit.png'
                className='drop-shadow-xl rounded-full border'
                width={40}
                alt=''
              />
            </Link>
            <Link
              to='/despote'
              className='hover:scale-110 hover:drop-shadow-2xl transition-all ease-in-out duration-200'
            >
              <img
                src='/img/deposit.png'
                className='drop-shadow-xl rounded-full border'
                width={40}
                alt=''
              />
            </Link>
            <Link
              to='/account/security/?sdsd=anirudh'
              className='hover:scale-110 hover:drop-shadow-2xl transition-all ease-in-out duration-200'
            >
              <img
                src='/img/deposit.png'
                className='drop-shadow-xl rounded-full border'
                width={40}
                alt=''
              />
            </Link>
          </div>
        </div>
      ) : (
        <Crypto_cards_skelton />
      )}
    </div>
  );
});

export const Crypto_cards = memo(function Crypto_cards({ binance_pairs }) {
  const [selected_pairs, setSelected_pairs] = useState([
    'BTCUSDT',
    'ETHUSDT',
    'SOLUSDT',
    'BNBUSDT',
  ]);

  function update_Selected_pairs(index, symbol) {
    setSelected_pairs((prev) => {
      const updatedPairs = [...prev];
      updatedPairs[index] = symbol.toUpperCase();
      return updatedPairs;
    });
  }

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 '>
        {selected_pairs?.map((data, index) => {
          return (
            <ErrorBoundary key={index} fallback={<Crypto_cards_skelton />}>
              <Data_card
                update_Selected_pairs={update_Selected_pairs}
                index={index}
                binance_pairs={binance_pairs}
                data={data}
              />
            </ErrorBoundary>
          );
        })}
      </div>
    </>
  );
});
