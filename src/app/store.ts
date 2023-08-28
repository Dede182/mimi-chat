import { chatFileSlice } from './slices/chat/chatFileSlice';
import { onlineActiveUserSlice } from './slices/chat/onlineActiveUserSlice';
import { userSlice } from './slices/auth/UserSlice';
import { authSlice } from './slices/auth/AuthSlices';
import { settingSlice } from './slices/settingSlices';

import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import {sidebarSlice} from './slices/sidebarSlice';

export const store = configureStore({
  reducer: {
    setting : settingSlice.reducer,
    auth : authSlice.reducer,
    sidebar : sidebarSlice.reducer,
    user : userSlice.reducer,
    onlineActiveUsers : onlineActiveUserSlice.reducer,
    chatFile : chatFileSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunkMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: { loading: LoadingState, movies: MoviesState }
export type AppDispatch = typeof store.dispatch;