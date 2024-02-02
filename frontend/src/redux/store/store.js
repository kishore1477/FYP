import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../slice/authenticationSlice';
import userReducer from '../slice/userSlice';

export  const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    user: userReducer,
    // other reducers...
  },
});