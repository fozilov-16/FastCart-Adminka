import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "./../../utils/axios";

export const api = import.meta.env.VITE_URL_PRODUCTS;

export const GetProduct = createAsyncThunk(
  "counter/GetProduct",
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

export const DeleteProduct = createAsyncThunk(
  "counter/DeleteProduct",
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
  "counter/EditProduct",
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
