import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  editItem: null,
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },

    addItem(state, action) {
      state.items.unshift(action.payload);
    },

    removeItem(state, action) {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    updateItem(state, action) {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },

    setEditItem(state, action) {
      state.editItem = action.payload;
    },

    clearEditItem(state) {
      state.editItem = null;
    },
  },
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;