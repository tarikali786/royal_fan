import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brand: "",
  type: "",
  priceRange: [0, 10000],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setBrand: (state, action) => {
      state.brand = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    clearFilters: (state) => {
      state.brand = "";
      state.type = "";
      state.priceRange = [0, 10000];
    },
  },
});

export const { setBrand, setType, setPriceRange, clearFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
