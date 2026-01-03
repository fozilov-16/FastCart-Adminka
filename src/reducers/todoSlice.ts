import { createSlice } from "@reduxjs/toolkit";
import {
  AddProduct,
  GetBrend,
  GetCategory,
  GetColor,
  GetProduct,
  GetSubCategory,
  userProfile,
} from "../api/api";

export interface Product {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  categoryName: string;
  image?: string;
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
  userId: string;
  userName: string;
  image: string;
  userRoles: {
    id: string;
    name: string;
  }[];
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dob: string;
}

export interface EditProductPayload {
  Id: number;
  ProductName: string;
  Description: string;
  Quantity: number;
  Code: string;
  Price: number;
  BrandId: number;
  ColorId: number;
  SubCategoryId: number;
  HasDiscount: boolean;
  DiscountPrice?: number;
  Weight?: string;
  Size?: string;
}

export interface TodoState {
  products: Product[];
  categories: Category[];
  subCategory: Category[];
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
  subCategory: [],
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
    builder.addCase(GetSubCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetSubCategory.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.subCategory = payload;
    });
    builder.addCase(GetSubCategory.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(AddProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(AddProduct.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.products.push(payload);
    });
    builder.addCase(AddProduct.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(userProfile.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(userProfile.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.profile = payload;
    });

    builder.addCase(userProfile.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default todoSlice.reducer;
