import { Route, Routes } from "react-router-dom";
import LoginPage from "./features/login/login";
import DashboardPage from "./features/dashboard/main";
import Layout from "./features/NavBar/layout";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      {/* Protected routes */}
      <Route path="/" element={<Layout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  )
}