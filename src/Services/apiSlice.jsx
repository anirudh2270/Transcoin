import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-hot-toast';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_baseURL,

  prepareHeaders: (headers) => {
    const Token = localStorage.getItem('Token');
    if (Token) {
      headers.set('authorization', `${Token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.data?.refresh_token) {
    localStorage.setItem('Token', result.data.refresh_token);
    result = await baseQuery(args, api, extraOptions);
  }
  if (result.error) {
    switch (result.error.status) {
      case 401:
        localStorage.removeItem('Token');
        localStorage.removeItem('Email');
        window.location.replace('/login');
        break;

      default:
        toast.error(
          result.error.data.message ||
            'Something went wrong! Try again later...'
        );
        break;
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: baseQueryWithReauth,

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: { data },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    sidebar: builder.query({
      query: () => '/sidebar',
    }),
    ticker: builder.query({
      query: () => `/binance/ticker`,
    }),
    currency_pairs: builder.query({
      query: () => '/binance/pairs',
    }),
    listen_key: builder.query({
      query: () => '/binance/listen_key',
    }),
    assets_balance: builder.query({
      query: () => '/binance/assets_balance',
    }),
  }),
});

export const {
  useLogoutMutation,
  useLoginMutation,
  useSidebarQuery,
  usePrefetch,
  useCurrency_pairsQuery,
  useTickerQuery,
  useListen_keyQuery,
  useAssets_balanceQuery,
} = apiSlice;
