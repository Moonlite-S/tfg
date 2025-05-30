import AxiosInstance from "@/axios";
import axios, { type AxiosResponse } from "axios"

export const login = async (data: { email: string; password: string }): Promise<AxiosResponse<{ access: string; refresh: string }>> => {
  try {
    const response = await AxiosInstance.post("/token/", data)

    // save the token to local storage
    localStorage.setItem("access_token", response.data.access)
    localStorage.setItem("refresh_token", response.data.refresh)

    // set the access token in the header for all requests
    AxiosInstance.defaults.headers.common["Authorization"] = `Bearer ${response.data.access}`
    return response

  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || 'Login failed')
    }
    throw error
  }
}