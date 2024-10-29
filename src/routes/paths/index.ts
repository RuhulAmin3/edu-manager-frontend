import App from "../../App";
import ChangePasswordPage from "../../pages/auth/change-password";
import ForgotPasswordPage from "../../pages/auth/forgot-password";
import GuardianRegisterPage from "../../pages/auth/guardian-register";
import LoginPage from "../../pages/auth/login";

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
  {
    path: "register",
    element: GuardianRegisterPage,
  },
];
