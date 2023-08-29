import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { useCurrency_pairsQuery } from '../Services/apiSlice.jsx';
import React, { useEffect, useState } from 'react';
import { VariableSizeList as List } from 'react-window';
import { shallowEqual, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

export function Convert_select({ register, ...props }) {
  const [pair, setPairs] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('ETH');
  const [query, setQuery] = useState('');
  const [input, setInput] = useState('');
  const binance_pairs = useCurrency_pairsQuery();
  const assets_balance = useSelector(
    (state) => (props.show_balance ? state.Asset_balance.data[selected] : {}),
    shallowEqual
  );

  useEffect(() => {
    if (binance_pairs.data) {
      let a = [];
      for (let i = 0; i < binance_pairs.data.length; i++) {
        a.push(binance_pairs.data[i].baseAsset);
      }

      setPairs(a);
    }
  }, [binance_pairs.data]);

  const handleChange = useCallback(
    (e) => {
      const inp = document.getElementById('price');
      if (e.target.value > Number(assets_balance.free) && props.show_balance) {
        if (inp.classList.contains('border-0')) {
          inp.classList.replace('border-0', 'border-1');
        }
      } else {
        if (inp.classList.contains('border-1')) {
          inp.classList.replace('border-1', 'border-0');
        }
      }
      setInput(e.target.value);
    },
    [assets_balance?.free, props.show_balance]
  );

  const filteredpair = useMemo(() => {
    return query === ''
      ? pair
      : pair.filter((pair) =>
          pair
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );
  }, [pair, query]);

  const options = ({ index, style }) => (
    <div
      style={style}
      onClick={() => {
        setSelected(filteredpair[index]);
        setQuery(filteredpair[index]);
        setOpen(!open);
      }}
      key={index}
      className='py-2 px-4 cursor-pointer gap-3 flex items-center hover:bg-zinc-200'
    >
      <img
        width={28}
        height={28}
        src={`/crypto_icons/${filteredpair[index].toLowerCase()}.png`}
        onError={(e) => {
          e.currentTarget.src = '/crypto_icons/not_found.png';
        }}
        alt=''
      />
      <span className='text-sm font-medium text-gray-600'>
        {filteredpair[index]}
      </span>
    </div>
  );

  return (
    <>
      <div className='flex justify-between items-center'>
        <label
          htmlFor='from'
          className='block  text-sm font-medium leading-6 text-text_secondary'
        >
          {props.lable}
        </label>

        {props.show_balance ? (
          <span className='text-sm font-medium leading-6 text-text_secondary'>
            Available :
            <span className='text-black ms-2 font-semibold'>
              {assets_balance?.free || 0}
            </span>
          </span>
        ) : null}
      </div>

      <div className='flex gap-3 items-center relative'>
        {/* input */}
        <div className='relative mt-2 rounded-md shadow-sm w-full flex-grow'>
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
            <span className=''>
              <img
                width={25}
                src={`/crypto_icons/${selected.toLowerCase()}.png`}
                onError={(e) => {
                  e.currentTarget.src = '/crypto_icons/not_found.png';
                }}
                alt=''
              />
            </span>
          </div>
          <input
            type='number'
            name='price'
            id='price'
            {...register(props.lable, { required: true })}
            onChange={(e) => handleChange(e)}
            placeholder={props.placeholder || ''}
            className='block bg-[#F5F4F6] w-full border-0 border-red-600 focus:border-red-600 focus:ring-0 rounded-lg  py-2.5 pl-12 pr-20 text-gray-900 '
          />
        </div>

        {/* select */}

        <div className='absolute right-[0.2rem]  top-[0.25rem]  mt-2 rounded-md shadow-sm'>
          <div className='relative'>
            <input
              onKeyUp={() => {
                if (open == false) {
                  setOpen(true);
                }
              }}
              placeholder={selected}
              onChange={(e) => setQuery(e.target.value)}
              value={!open ? selected : query}
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
                itemSize={() => 43}
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='my-6'>
          <Convert_select
            lable={'From'}
            show_balance={true}
            placeholder={'Enter Amount'}
            register={register}
          />
        </div>

        <div className='my-6'>
          <Convert_select
            lable={'To'}
            placeholder={'Enter Amount'}
            register={register}
          />
        </div>

        <div className='mt-6'>
          <button
            type='submit'
            className='w-full py-2.5 rounded-lg gradiant_bg text-white font-semibold text-center'
          >
            Proceed
          </button>
        </div>
      </form>
    </>
  );
}
