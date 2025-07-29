import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../app/pages/Landing";
import { LoginPage } from "../app/pages/Auth/Login";
import { SignupPage } from "../app/pages/Auth/Signup";
import { ForgotPasswordPage } from "../app/pages/Auth/ForgotPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
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
]);
