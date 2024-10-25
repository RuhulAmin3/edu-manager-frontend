import App from "../../App";
import ChangePasswordPage from "../../pages/auth/ChangePassword";
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
];
