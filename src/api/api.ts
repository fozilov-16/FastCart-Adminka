import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "./../../utils/axios";
import { SaveToken } from "./../../utils/axios";
import type {
  AddProductPayload,
  EditProductPayload,
} from "../reducers/todoSlice";

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

export const userProfile = createAsyncThunk("todo/userProfile", async () => {
  const { data } = await axiosRequest.get("/UserProfile/get-user-profiles");
  return data.data;
});

export const AddProduct = createAsyncThunk(
  "todo/AddProduct",
  async (payload: AddProductPayload, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append("ProductName", payload.ProductName);
      formData.append("Description", payload.Description);
      formData.append("Quantity", payload.Quantity.toString());
      formData.append("Code", payload.Code);
      formData.append("Price", payload.Price.toString());
      formData.append("SubCategoryId", payload.SubCategoryId.toString());
      formData.append("BrandId", payload.BrandId.toString());
      formData.append("ColorId", payload.ColorId.toString());

      if (payload.HasDiscount !== undefined) {
        formData.append("HasDiscount", String(payload.HasDiscount));
      }
      if (payload.DiscountPrice !== undefined) {
        formData.append("DiscountPrice", payload.DiscountPrice.toString());
      }
      if (payload.Weight) {
        formData.append("Weight", payload.Weight);
      }
      if (payload.Size) {
        formData.append("Size", payload.Size);
      }
      if (payload.Images && payload.Images.length > 0) {
        payload.Images.forEach((file) => {
          formData.append("Images", file);
        });
      }
      const { data } = await axiosRequest.post(
        "/Product/add-product",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return data;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const EditProduct = createAsyncThunk(
  "todo/EditProduct",
  async (payload: EditProductPayload, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.put(
        "/Product/update-product?",
        null,
        {
          params: {
            Id: payload.Id,
            ProductName: payload.ProductName,
            Description: payload.Description,
            Quantity: payload.Quantity,
            Code: payload.Code,
            Price: payload.Price,
            BrandId: payload.BrandId,
            ColorId: payload.ColorId,
            SubCategoryId: payload.SubCategoryId,
            HasDiscount: payload.HasDiscount,
            DiscountPrice: payload.DiscountPrice,
            Weight: payload.Weight,
            Size: payload.Size,
          },
        }
      );

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const GetSubCategory = createAsyncThunk(
  "todo/GetSubCategory",
  async () => {
    const { data } = await axiosRequest.get("/SubCategory/get-sub-category");
    return data.data;
  }
);
