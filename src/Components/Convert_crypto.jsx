import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { useCurrency_pairsQuery } from '../Services/apiSlice.jsx';
import React, { useEffect, useState } from 'react';
import { VariableSizeList as List } from 'react-window';

export function Convert_select() {
  const [pair, setPairs] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({ id: 1, name: 'ETH' });
  const [query, setQuery] = useState('');
  const binance_pairs = useCurrency_pairsQuery();

  useEffect(() => {
    if (binance_pairs.data) {
      let a = [];
      for (let i = 0; i < binance_pairs.data.length; i++) {
        a.push({ id: i, name: binance_pairs.data[i].baseAsset });
      }
      setPairs(a);
    }
  }, [binance_pairs.data]);

  const filteredpair =
    query === ''
      ? pair
      : pair.filter((pair) =>
          pair.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  const options = ({ index, style }) => (
    <div
      style={style}
      onClick={() => {
        setSelected(filteredpair[index]);
        setQuery(filteredpair[index].name);
        setOpen(!open);
      }}
      key={index}
      className='py-2 px-4 cursor-pointer gap-3 flex items-center hover:bg-zinc-200'
    >
      <img
        width={28}
        height={28}
        src={`/crypto_icons/${filteredpair[index].name.toLowerCase()}.png`}
        onError={(e) => {
          e.currentTarget.src = '/crypto_icons/not_found.png';
        }}
        alt=''
      />
      <span className='text-sm font-medium text-gray-600'>
        {filteredpair[index].name}
      </span>
    </div>
  );

  return (
    <>
      <div className='flex gap-3 items-center relative'>
        {/* input */}
        <div className='relative mt-2 rounded-md shadow-sm w-full flex-grow'>
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
            <span className=''>
              <img
                width={25}
                src={`/crypto_icons/${selected.name.toLowerCase()}.png`}
                onError={(e) => {
                  e.currentTarget.src = '/crypto_icons/not_found.png';
                }}
                alt=''
              />
            </span>
          </div>
          <input
            type='text'
            name='price'
            id='price'
            className='block bg-[#F5F4F6] w-full rounded-lg border-0 py-2.5 pl-10 pr-20 text-gray-900 '
          />
        </div>

        {/* select */}

        <div className='absolute right-[0rem]  top-[0.2rem]  mt-2 rounded-md shadow-sm'>
          <div className='relative'>
            <input
              onKeyUp={() => {
                if (open == false) {
                  setOpen(true);
                }
              }}
              placeholder={selected.name}
              onChange={(e) => setQuery(e.target.value)}
              value={!open ? selected.name : query}
              type='text'
              name='price'
              id='price'
              className='block w-[5.5rem]  rounded-md font-medium  py-1.5 pr-8  text-gray-900 border-0 shadow ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />

            <button
              className='absolute inset-y-0 right-0 flex items-center pr-2'
              onClick={() => {
                setOpen(!open);
                setQuery('');
              }}
            >
              <ChevronUpDownIcon
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </button>
          </div>

          <div
            className={`absolute top-[3rem] z-[99] right-0 rounded-lg bg-white drop-shadow-lg py-2 ${
              open ? 'block' : 'hidden'
            }`}
          >
            {filteredpair.length === 0 && query != '' ? (
              <List
                height={150}
                itemCount={filteredpair.length + 1}
                itemSize={() => 45}
                width={140}
              >
                {(style) => {
                  return (
                    <div className='p-4 text-center' style={style}>
                      No Results
                    </div>
                  );
                }}
              </List>
            ) : (
              <List
                height={150}
                itemCount={filteredpair.length}
                itemSize={() => 45}
                width={140}
              >
                {options}
              </List>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default function Convert_crypto() {
  return (
    <>
      <div className='my-6'>
        <label
          htmlFor='from'
          className='block text-sm font-medium leading-6 text-text_secondary'
        >
          From
        </label>

        <Convert_select />
      </div>

      <div className='my-6'>
        <label
          htmlFor='from'
          className='block text-sm font-medium leading-6 text-text_secondary'
        >
          To
        </label>

        <Convert_select />
      </div>

      <div className='mt-6'>
        <button className='w-full py-2.5 rounded-lg gradiant_bg text-white font-semibold text-center'>
          Proceed
        </button>
      </div>
    </>
  );
}