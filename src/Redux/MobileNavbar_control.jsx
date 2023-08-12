import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  is_collapsed: false,
};

export const Sidebar_collapse = createSlice({
  name: 'sidebar_collapse',
  initialState,
  reducers: {
    Switch_sidebar: (state) => {
      state.is_collapsed == true
        ? (state.is_collapsed = false)
        : (state.is_collapsed = true);
    },
    sidebar_off: (state) => {
      state.is_collapsed = false;
    },
  },
});

export const { Switch_sidebar, sidebar_off } = Sidebar_collapse.actions;
export default Sidebar_collapse.reducer;
