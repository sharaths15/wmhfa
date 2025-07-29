import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../app/pages/Landing";
import { LoginPage } from "../app/pages/Auth/Login";
import { SignupPage } from "../app/pages/Auth/Signup";
import { ForgotPasswordPage } from "../app/pages/Auth/ForgotPassword";
import { DashboardPage } from "../app/pages/Dashboard";
import { ProtectedRoute } from "./ProtectedRoutes";
import { PublicRoute } from "./PublicRoutes";
import App from "../App.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/signup",
            element: <SignupPage />,
          },
          {
            path: "/forgot-password",
            element: <ForgotPasswordPage />,
          },
          {
            index: true,
            element: <LandingPage />,
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "dashboard",
            element: <DashboardPage />,
          },
        ],
      },
    ],
  },
]);
