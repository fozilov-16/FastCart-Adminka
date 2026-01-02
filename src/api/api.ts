import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "./../../utils/axios";
import { SaveToken } from "./../../utils/axios";

export const api = import.meta.env.VITE_URL_PRODUCTS;

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (obj: { userName: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.post("/Account/login", obj);
      SaveToken(data.data);
      localStorage.setItem("userName", obj.userName);
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login error");
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

export const GetCategory = createAsyncThunk("todo/GetCategory", async () => {
  const { data } = await axiosRequest.get("/Category/get-categories");
  return data.data;
});

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

export const GetBrend = createAsyncThunk("todo/GetBrend", async () => {
  try {
    const { data } = await axiosRequest.get(`/Brand/get-brands`);
    return data;
  } catch (error) {
    console.error;
  }
});

export const GetColor = createAsyncThunk("todo/GetColor", async () => {
  try {
    const { data } = await axiosRequest.get(`/Color/get-colors`);
    return data;
  } catch (error) {
    console.error;
  }
});
