import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cache: {}, // key -> payload
  lastQuery: '',
  pagination: { page: 1, pageSize: 12, total: 0 },
};

const foodsSlice = createSlice({
  name: 'foods',
  initialState,
  reducers: {
    // PUBLIC_INTERFACE
    setCache: (state, action) => {
      const { key, data } = action.payload || {};
      if (!key) return;
      state.cache[key] = data;
    },
    // PUBLIC_INTERFACE
    setLastQuery: (state, action) => {
      state.lastQuery = action.payload || '';
    },
    // PUBLIC_INTERFACE
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...(action.payload || {}) };
    },
    // PUBLIC_INTERFACE
    reset: () => initialState,
  },
});

export const { setCache, setLastQuery, setPagination, reset } = foodsSlice.actions;
export default foodsSlice.reducer;
