import App from "../../App";
import { ROLE } from "../../common/constants";
import { USER } from "../../common/constants/local-storage.constant";
import { getFromLocalStorage } from "../../common/utils/local-storage.utils";
import RootLayout from "../../layouts";
import ChangePasswordPage from "../../pages/auth/change-password";
import ForgotPasswordPage from "../../pages/auth/forgot-password";
import GuardianRegisterPage from "../../pages/auth/guardian-register";
import LoginPage from "../../pages/auth/login";
import NotFoundPage from "../../pages/not-found";
import TeacherList from "../../pages/teacher";

const user: Record<string, string> | null = getFromLocalStorage(USER);

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
    path: "forgot-password",
    element: ForgotPasswordPage,
  },
  {
    path: "change-password",
    element: ChangePasswordPage,
  },
  {
    path: "register",
    element: GuardianRegisterPage,
  },
  {
    path: "*",
    element: NotFoundPage,
  },
];

export const adminRoutes = [{}];
export const teacherRoutes = [{ index: true, element: TeacherList }];
export const studentRoutes = [{}];
export const guardianRoutes = [{}];

export const layoutRoutes =
  user == null
    ? []
    : [
        {
          path: `${user?.role?.toLowerCase()}`,
          element: RootLayout,
          children:
            user.role == ROLE.ADMIN
              ? adminRoutes
              : user.role == ROLE.TEACHER
              ? teacherRoutes
              : user.role == ROLE.GUARDIAN
              ? guardianRoutes
              : studentRoutes,
        },
      ];
