import { Navigate, Outlet } from "react-router-dom";

export function Verification() {
  const isAuthenticated = localStorage.getItem("access_token") !== null

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/" replace />
  }

  // If authenticated, render the child routes
  return <Outlet />
} 