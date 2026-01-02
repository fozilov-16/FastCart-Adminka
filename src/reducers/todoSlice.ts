import { createSlice } from "@reduxjs/toolkit";
import {
  GetBrend,
  GetCategory,
  GetColor,
  GetProduct,
  userProfile,
} from "../api/api";

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
  brend: any[];
  color: any[];
  profile: Profile[];
  isLoading: boolean;
}

const initialState: TodoState = {
  products: [],
  categories: [],
  profile: [],
  isLoading: false,
  brend: [],
  color: [],
};

export interface AddProductPayload {
  ProductName: string;
  Description: string;
  Quantity: number;
  Weight?: string;
  Size?: string;
  Code: string;
  Price: number;
  HasDiscount?: boolean;
  DiscountPrice?: number;
  SubCategoryId: number;
  BrandId: number;
  ColorId: number;
  Images?: File[];
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
      state.categories = payload;
    });
    builder.addCase(GetCategory.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(GetBrend.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetBrend.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.brend = payload.data;
    });
    builder.addCase(GetBrend.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(GetColor.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetColor.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.color = payload.data;
    });
    builder.addCase(GetColor.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default todoSlice.reducer;
