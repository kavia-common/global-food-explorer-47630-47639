import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
  try {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
  } catch {
    /* ignore */
  }
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

const initialState = {
  theme: getInitialTheme(),
  loading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // PUBLIC_INTERFACE
    setTheme: (state, action) => {
      state.theme = action.payload || 'light';
      try {
        document.documentElement.setAttribute('data-theme', state.theme);
        localStorage.setItem('theme', state.theme);
      } catch {
        /* ignore */
      }
    },
    // PUBLIC_INTERFACE
    setLoading: (state, action) => {
      state.loading = !!action.payload;
    },
  },
});

export const { setTheme, setLoading } = uiSlice.actions;
export default uiSlice.reducer;
