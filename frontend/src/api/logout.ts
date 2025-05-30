import type { NavigateFunction } from "react-router-dom"

export const logout = (navigate: NavigateFunction) => {
  try {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    navigate("/")
  } catch (error) {
    console.error("Error logging out:", error)
  }
}