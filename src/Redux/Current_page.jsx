import { createSlice } from '@reduxjs/toolkit';

const initialState = { route: '', count: 0 };

const Current_page = createSlice({
  name: 'Current_page',
  initialState,
  reducers: {
    set_Current_page: (state, action) => {
      state.route = action.payload;
    },
    inc_count: (state) => {
      state.count++;
    },
  },
});

export const { set_Current_page, inc_count } = Current_page.actions;
export default Current_page.reducer;
