import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "./../../utils/axios";
import { SaveToken } from "./../../utils/axios";

export const api = import.meta.env.VITE_URL_PRODUCTS;

export const loginThunk = createAsyncThunk(
  "auth/login", async (
    obj: { userName: string; password: string },
    { rejectWithValue } ) => {
    try {
      const { data } = await axiosRequest.post("/Account/login", obj);
      SaveToken(data.data);
      localStorage.setItem("userName", obj.userName);
      return data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Login error"
      );
    }
  }
);

export const GetProduct = createAsyncThunk(
  "todo/GetProduct",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.get("/Product/get-products");
      return data;
    } catch (error: any) {
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
    }
  }
);

export const GetCategory = createAsyncThunk(
  "todo/GetCategory", async () => {
    try {
      const { data } = await axiosRequest.get(`/Category/get-categories`);
      return data.data;
    } catch (error) {
      console.error
    }
  }
)

export const DeleteProduct = createAsyncThunk(
  "todo/DeleteProduct",
  async (id: number, { dispatch, rejectWithValue }) => {
    try {
      await axiosRequest.delete(`/Product/delete-product?id=${id}`);

      dispatch(GetProduct());
      return id;
    } catch (error: any) {
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
    }
  }
);

export const EditProduct = createAsyncThunk(
  "todo/EditProduct",
  async (
    {
      idxEdit,
      productNameEdit,
      inventoryEdit,
      categoryEdit,
      priceEdit,
      brandId,
      colorId,
      code,
      description,
      hasDiscount,
    }: {
      idxEdit: number;
      productNameEdit: string;
      inventoryEdit: number;
      categoryEdit: number;
      priceEdit: number;
      brandId: number;
      colorId: number;
      code: string;
      description: string;
      hasDiscount: boolean;
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      await axiosRequest.put(`/Product/update-product?`, {
        params: {
          Id: idxEdit,
          BrandId: brandId,
          ColorId: colorId,
          ProductName: productNameEdit,
          Description: description,
          Quantity: inventoryEdit,
          Code: code,
          Price: priceEdit,
          HasDiscount: hasDiscount,
          SubCategoryId: categoryEdit,
        },
      });

      dispatch(GetProduct());
    } catch (error: any) {
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
    }
  }
);


export const userProfile = createAsyncThunk(
  "todo/GetCategory", async () => {
    try {
      const { data } = await axiosRequest.get(`/UserProfile/get-user-profiles`);
      return data.data;
    } catch (error) {
      console.error
    }
  }
)