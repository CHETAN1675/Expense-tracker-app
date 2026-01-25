import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = {
  isDark: JSON.parse(localStorage.getItem("isDark") || "false"),
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    toggleTheme(state) {
      state.isDark = !state.isDark;
      localStorage.setItem("isDark", JSON.stringify(state.isDark));
    },
    setTheme(state, action) {
      state.isDark = action.payload;
      localStorage.setItem("isDark", JSON.stringify(state.isDark));
    },
  },
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;
