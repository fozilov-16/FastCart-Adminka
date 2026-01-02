import { createSlice } from "@reduxjs/toolkit";
import { GetCategory, GetProduct } from "../api/api";

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

export interface Product {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  categoryName: string;
}

export interface SubCategory {
  id: number;
  subCategoryName: string;
}

export interface Category {
  id: number;
  categoryImage: string;
  categoryName: string;
  subCategories: SubCategory[];
}

export interface CounterState {
  products: Product[];
  categories: Category[];
  isLoading: boolean;
}

export const todoSlice = createSlice({
  name: "todo",
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
    builder.addCase(GetCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetCategory.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.categories = payload.data.categories;
    });
    builder.addCase(GetCategory.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default todoSlice.reducer;