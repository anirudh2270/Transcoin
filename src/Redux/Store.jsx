import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../Services/apiSlice.jsx';
import App_theme_Reducer from './App_theme.jsx';
import Sidebar_collapse_Reducer from './MobileNavbar_control.jsx';
import Prices_Reducer from './Prices.jsx';
import Asset_balance_Reducer from './Asset_balance.jsx';

export const Store = configureStore({
  reducer: {
    App_theme: App_theme_Reducer,
    sidebar_collapsed: Sidebar_collapse_Reducer,
    Prices: Prices_Reducer,
    Asset_balance: Asset_balance_Reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});
