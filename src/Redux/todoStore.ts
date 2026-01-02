import { createSlice } from "@reduxjs/toolkit";
import { GetProduct } from "../api/api";

export interface CounterState {
  products: {
    id: number;
    productName: string;
    price: number;
    quantity: number;
    categoryName: string;
  }[];
  isLoading: boolean;
}

const initialState: CounterState = {
  products: [],
  isLoading: false,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetProduct.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.products = payload.data.products;
    });
    builder.addCase(GetProduct.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default counterSlice.reducer;
