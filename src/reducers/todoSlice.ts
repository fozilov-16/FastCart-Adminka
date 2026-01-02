import { createSlice } from "@reduxjs/toolkit";
import { GetCategory, GetProduct, userProfile } from "../api/api";

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

export interface Profile {
  id: string;
  userId: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  dob: number;
}


export interface TodoState {
  products: Product[];
  categories: Category[];
  profile: Profile[];
  isLoading: boolean;
}

const initialState: TodoState = {
  products: [],
  categories: [],
  profile: [],
  isLoading: false,
};


export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(GetProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetProduct.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.products = payload.data.products;
      })
      .addCase(GetProduct.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(GetCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetCategory.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.categories = payload.data.categories;
      })
      .addCase(GetCategory.rejected, (state) => {
        state.isLoading = false;
      })
  },
});

export default todoSlice.reducer;
