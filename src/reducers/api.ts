import { axiosRequest } from './../../utils/axios';
export const api = import.meta.env.VITE_ADMIN_API;

type LoginPayload = {
    email: string;
    password: string;
};

export async function login(obj: LoginPayload) {
    try {
      const { data } = await axiosRequest.post(`${api}/Account/login`, {
        userName: obj.email,
        password: obj.password,
      });
      localStorage.setItem("token", data.data);
      return { success: true, token: data.data };
    } catch (error: any) {
      console.log(error.response?.data || error.message);
      return { success: false, error: error.response?.data?.message || "Login failed" };
    }
}
