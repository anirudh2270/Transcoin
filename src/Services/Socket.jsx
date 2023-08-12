import { useCallback, useEffect } from 'react';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import {
  useAssets_balanceQuery,
  useListen_keyQuery,
  useTickerQuery,
} from './apiSlice.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { update_price } from '../Redux/Prices.jsx';
import { update_balance } from '../Redux/Asset_balance.jsx';

export default function Socket() {
  const ticker = useTickerQuery();
  const listen_key = useListen_keyQuery();
  const assets_balance = useAssets_balanceQuery();
  const dispatch = useDispatch();
  const ticker_data = useSelector((state) => state.Prices.data);

  useEffect(() => {
    if (ticker.isSuccess) {
      dispatch(update_price(ticker.data));
    }
  }, [dispatch, ticker.data, ticker.isSuccess]);

  useEffect(() => {
    if (assets_balance.isSuccess) {
      dispatch(update_balance(assets_balance.data));
    }
  }, [dispatch, assets_balance.data, assets_balance.isSuccess]);

  const { lastMessage } = useWebSocket(
    `wss://stream.binance.com:9443/ws/!ticker@arr`,
    {
      onOpen: () => {
        console.log('Opened Ticker');
      },
    }
  );

  const balance_socket = useWebSocket(
    `wss://testnet.binance.vision/ws/${listen_key.ticker_data?.listenKey}`,
    {
      onOpen: () => {
        console.log('Opened Balance');
      },
    }
  );

  const update = useCallback(
    (message) => {
      const socket_keys = [
        's',
        'p',
        'P',
        'c',
        'Q',
        'b',
        'B',
        'a',
        'A',
        'o',
        'h',
        'l',
        'v',
        'q',
        'C',
        'F',
        'L',
        'n',
      ];

      const new_state = structuredClone(ticker_data);

      const obj_keys = Object.keys(new_state[Object.keys(new_state)[0]]);

      for (let i = 0; i < message.length; i++) {
        if (new_state[message[i].s]) {
          for (let j = 0; j < socket_keys.length; j++) {
            new_state[message[i].s][obj_keys[j]] = message[i][socket_keys[j]];
          }
        }
      }

      dispatch(update_price(new_state));
    },
    [dispatch, ticker_data]
  );

  useEffect(() => {
    if (lastMessage !== null) {
      const timer = setTimeout(() => {
        let message = JSON.parse(lastMessage.data);
        update(message);
      }, [500]);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [lastMessage, update]);

  useEffect(() => {
    if (balance_socket.lastMessage) {
      console.log(balance_socket.lastMessage);
    }
  }, [balance_socket.lastMessage]);

  return null;
}
