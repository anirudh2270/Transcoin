import { createSlice } from '@reduxjs/toolkit';

export const Prices = createSlice({
  name: 'Prices',
  initialState: {
    data: [],
  },
  reducers: {
    update_price: (state, actions) => {
      state.data = actions.payload;
    },
  },
});

export const { update_price } = Prices.actions;
export default Prices.reducer;
