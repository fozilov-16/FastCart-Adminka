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
