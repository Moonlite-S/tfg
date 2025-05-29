import axios from "axios"

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await axios.post("http://localhost:8000/api/token/", data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      withCredentials: true
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || 'Login failed')
    }
    throw error
  }
}