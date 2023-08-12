import { createSlice } from '@reduxjs/toolkit';

const mode = localStorage.getItem('app_theme');

const initialState = {
  mode: mode ? mode : 'light',
};

export const App_theme = createSlice({
  name: 'App_theme',
  initialState,
  reducers: {
    Switch_theme: (state) => {
      state.mode == 'dark' ? (state.mode = 'light') : (state.mode = 'dark');
    },
  },
});

export const { Switch_theme } = App_theme.actions;
export default App_theme.reducer;
