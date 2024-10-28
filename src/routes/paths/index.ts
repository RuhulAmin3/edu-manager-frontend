import App from "../../App";
import ChangePasswordPage from "../../pages/auth/ChangePassword";
import ForgotPasswordPage from "../../pages/auth/ForgotPassword";
import LoginPage from "../../pages/auth/Login";

export const commonRoutes = [
  {
    path: "/",
    element: App,
  },
  {
    path: "login",
    element: LoginPage,
  },
  {
    path: "change-password",
    element: ChangePasswordPage,
  },
  {
    path: "forgot-password",
    element: ForgotPasswordPage,
  },
];
