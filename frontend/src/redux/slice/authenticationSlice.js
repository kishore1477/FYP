// authenticationSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  isAuthenticated: false,
  
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload; // convert a value to its boolean equivalent
    },
    clearToken: (state) => {
      state.token = null;
      state.isAuthenticated = false;
    },
    resetAuthenticationSlice: (state) => {
      // Reset the state to the initial state
      state.token = initialState.token;
      state.isAuthenticated = initialState.isAuthenticated;
    },
  },
});

export const { setToken, clearToken, resetAuthenticationSlice } = authenticationSlice.actions;
export default authenticationSlice.reducer;