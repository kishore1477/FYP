
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    quantity: 0
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setTotalQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    resetUserSlice: (state) => {
      // Reset the state to the initial state
      state.user = initialState.user;
      state.quantity = initialState.quantity;
    },
  },
});

export const { setUser, setTotalQuantity , resetUserSlice} = userSlice.actions;
export default userSlice.reducer;