import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: localStorage.getItem("token"),
  email: localStorage.getItem("email"),
  // localStorage stores strings, so we convert to boolean
  isPremium: localStorage.getItem("isPremium")==="true",
  isLoggedIn: localStorage.getItem("isLoggedIn")==="true",
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {

      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isLoggedIn = true;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("isLoggedIn", true);
    },

    logout(state) {
      state.token = null;
      state.email = null;
      state.isPremium = false;
      state.isLoggedIn = false;

      localStorage.removeItem("token");
      localStorage.removeItem("email"); 
      localStorage.removeItem("isPremium");
      localStorage.removeItem("isLoggedIn");
    },

    setIsPremium(state) {
      state.isPremium = true;
      localStorage.setItem("isPremium", "true");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;