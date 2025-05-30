import { Route, Routes } from "react-router-dom";
import LoginPage from "./features/login/login";
import DashboardPage from "./features/dashboard/main";
import Layout from "./features/NavBar/layout";
import { Verification } from "./components/Verification";
import { Error401Page, Error403Page, Error404Page } from "./components/error";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      {/* Protected routes */}
      <Route element={<Verification />}>
        {/* Layout is the navbar / sidebar */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Route>

      {/* Error pages */}
      <Route path="*" element={<Error404Page />} />
      <Route path="/401" element={<Error401Page />} />
      <Route path="/403" element={<Error403Page />} />
    </Routes>
  )
}