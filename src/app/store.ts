import { settingSlice } from './slices/settingSlices';

import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

export const store = configureStore({
  reducer: {
    setting : settingSlice.reducer
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