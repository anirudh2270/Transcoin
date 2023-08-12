import { createSlice } from '@reduxjs/toolkit';

export const Asset_balance = createSlice({
  name: 'asset_balance',
  initialState: {
    data: '',
  },
  reducers: {
    update_balance: (state, actions) => {
      state.data = actions.payload;
    },
  },
});

export const { update_balance } = Asset_balance.actions;
export default Asset_balance.reducer;
