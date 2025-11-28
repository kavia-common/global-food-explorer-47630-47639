import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import foodsReducer from './slices/foodsSlice';

/**
 * PUBLIC_INTERFACE
 * Creates and exports the Redux store for the app.
 */
export const store = configureStore({
  reducer: {
    ui: uiReducer,
    foods: foodsReducer,
  },
});
