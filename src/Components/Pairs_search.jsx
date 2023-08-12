import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, React } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

export default function Pair_search({
  baseAsset,
  binance_pairs,
  index,
  update_Selected_pairs,
}) {
  let [isOpen, setIsOpen] = useState(false);
  let [search, setSearch] = useState('');
  let [IsHover, set_IsHover] = useState(false);
  const prices = useSelector((state) => state.Prices.data);
  const btn_index = index;

  const searching = () => {
    const results = [];
    Object.keys(prices).filter((price) => {
      if (
        price
          .toLowerCase()
          .replace('usdt', '')
          .includes(search.toLocaleLowerCase())
      ) {
        results.push(prices[price]);
      }
    });
    return results;
  };

  const top_prices = [];

  if (prices) {
    const top_symbols = [
      'ETHUSDT',
      'BTCUSDT',
      'SOLUSDT',
      'BNBUSDT',
      'CAKEUSDT',
      'DOGEUSDT',
      'GASUSDT',
      'LUNAUSDT',
      'MATICUSDT',
    ];

    for (let i = 0; i < top_symbols.length; i++) {
      top_prices.push(prices[top_symbols[i]]);
    }
  }

  const handle_selected_pair = (symbol) => {
    update_Selected_pairs(btn_index, symbol);
    setIsOpen(false);
  };

  function li(pair, index) {
    return (
      <li
        onClick={() => {
          handle_selected_pair(pair.symbol);
        }}
        key={index}
        className='px-3 cursor-pointer py-2 rounded-lg font-semibold text-gray-600 hover:bg-zinc-100 ease-in-out duration-300 '
      >
        <div className='grid grid-cols-3 gap-4  font-semibold'>
          <div>
            {pair?.symbol.replace('USDT', '')}
            <span className=' text-sm  text-gray-400'>/USDT</span>
          </div>
          <div className='text-end  font-bold'>${Number(pair.lastPrice)}</div>
          <div
            className={`${
              Number(pair.priceChangePercent) < 0
                ? 'text-danger'
                : 'text-success'
            } text-end text-sm font-bold`}
          >
            {Number(pair.priceChangePercent).toFixed(2)}%{' '}
            <span>
              <i
                className={`${
                  Number(pair.priceChangePercent) < 0
                    ? 'text-danger rotate-180'
                    : 'text-success'
                } text-end text-sm fa-solid fa-caret-up `}
              ></i>
            </span>
          </div>
        </div>
      </li>
    );
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setSearch('');
    setIsOpen(true);
  }

  return (
    <>
      <div className=''>
        <button
          type='button'
          onClick={openModal}
          className='text-base font-bold mb-1'
        >
          <div className='flex items-center gap-1'>
            {baseAsset ? (
              baseAsset.toUpperCase()
            ) : (
              <div className='h-2.5 bg-gray-300 rounded-full animate-pulse dark:bg-gray-600 w-24'></div>
            )}
            <i className='fa-solid text-[#b3b3b3] fa-angle-down text-xs'></i>
          </div>
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <div className='flex justify-between items-center'>
                    <Dialog.Title
                      as='h3'
                      className='text-lg font-medium leading-6 text-gray-900'
                    >
                      {search == '' ? 'Top searches' : 'Search results'}
                    </Dialog.Title>

                    <div
                      className='flex items-center '
                      onMouseEnter={() => {
                        set_IsHover(true);
                      }}
                      onMouseLeave={() => {
                        set_IsHover(false);
                      }}
                    >
                      <button className='relative z-10'>
                        <motion.img
                          animate={{
                            x: !IsHover && search == '' ? '0rem' : '2rem',
                          }}
                          transition={{ duration: 0.7 }}
                          src='/img/search.png'
                          width={35}
                          loading='lazy'
                          alt=''
                        />
                      </button>

                      <motion.input
                        initial={{
                          height: '100%',
                          width: '0rem',
                          paddingLeft: '0rem',
                          x: '-1.5rem',
                        }}
                        animate={{
                          width: !IsHover && search == '' ? '0rem' : '12rem',
                          paddingLeft:
                            !IsHover && search == '' ? '0rem' : '2.5rem',
                          x: !IsHover && search == '' ? '-1.5rem' : '0rem',
                        }}
                        transition={{ duration: 0.7 }}
                        type='search'
                        autoFocus
                        onChange={(e) => {
                          setSearch(e.target.value);
                        }}
                        placeholder='Search'
                        className={`w-full py-1 pl-10
                         text-gray-500 border border-gray-200 rounded-2xl focus:ring-gray-200 focus:border-gray-200
                      `}
                      ></motion.input>
                    </div>
                  </div>

                  <div className='grid grid-cols-3 gap-4 font-semibold mt-7 pe-7 ps-3'>
                    <div>Pair</div>
                    <div className='text-end'>Price</div>
                    <div className='text-end'>Change</div>
                  </div>

                  <div className='my-2 py-2 overflow-auto h-[15rem]'>
                    {binance_pairs.data ? (
                      <ul className='pe-3' id='search_ul'>
                        {search == ''
                          ? top_prices.map((pair, index) => {
                              return li(pair, index);
                            })
                          : searching().map((pair, subindex) => {
                              return li(pair, subindex);
                            })}
                      </ul>
                    ) : (
                      'Loading...'
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
