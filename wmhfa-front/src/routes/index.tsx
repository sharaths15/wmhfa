import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../app/pages/Landing";
import { LoginPage } from "../app/pages/Auth/Login";
import { SignupPage } from "../app/pages/Auth/Signup";
import { ForgotPasswordPage } from "../app/pages/Auth/ForgotPassword";
import { DashboardLayout } from "../app/layout/DashboardLayout.tsx";
import { CommunityFeed } from "../app/pages/CommunityFeed";
import { SubscriptionsPage } from "../app/pages/Subscriptions";
import { AISupportPage as AISupport } from "../app/pages/AISupport";
import { ProtectedRoute } from "./ProtectedRoutes";
import { PublicRoute } from "./PublicRoutes";
import { ProfilePage } from "@/app/pages/Profile/index.tsx";
import { MyAchievementsPage } from "@/app/pages/Achievements/index.tsx";
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
            path: "/dashboard",
            element: <DashboardLayout />,
            children: [
              { path: "community-feed", element: <CommunityFeed /> },
              { path: "ai-support", element: <AISupport /> },
              { path: "subscriptions", element: <SubscriptionsPage /> },
              { path: "profile", element: <ProfilePage /> },
              { path: "achievements", element: <MyAchievementsPage /> },
              { index: true, element: <CommunityFeed /> },
            ],
          },
        ],
      },
    ],
  },
]);
