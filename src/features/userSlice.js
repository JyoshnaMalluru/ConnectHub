import { createSlice } from '@reduxjs/toolkit';

// Load from localStorage if available
const savedPrefs = JSON.parse(localStorage.getItem('contenthub-preferences')) || ['technology', 'sports'];
const savedDark = JSON.parse(localStorage.getItem('contenthub-darkmode'));

const initialState = {
  preferences: savedPrefs,
  favorites: [],
  darkMode: savedDark !== null ? savedDark : false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPreferences: (state, action) => {
      state.preferences = action.payload;
      localStorage.setItem('contenthub-preferences', JSON.stringify(action.payload));
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('contenthub-darkmode', JSON.stringify(state.darkMode));
    },
    addFavorite: (state, action) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter((id) => id !== action.payload);
    },
  },
});

export const { setPreferences, toggleDarkMode, addFavorite, removeFavorite } = userSlice.actions;
export default userSlice.reducer;
