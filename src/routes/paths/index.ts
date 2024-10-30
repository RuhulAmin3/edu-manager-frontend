import App from "../../App";
import { ROLE } from "../../common/constants";
import AdminSummaryPage from "../../pages/admin";
import AddGuardianPage from "../../pages/admin/guardian/add-guardian";
import ChangePasswordPage from "../../pages/auth/change-password";
import ForgotPasswordPage from "../../pages/auth/forgot-password";
import GuardianRegisterPage from "../../pages/auth/guardian-register";
import LoginPage from "../../pages/auth/login";
import GuardianSummaryPage from "../../pages/guardian";
import NotFoundPage from "../../pages/not-found";
import StudentSummaryPage from "../../pages/student";
import TeacherSummaryPage from "../../pages/teacher";

export const commonRoutes = [
  {
    path: "/",
    element: App,
  },
  {
    path: "login",
    element: LoginPage,
    public: true,
  },
  {
    path: "forgot-password",
    element: ForgotPasswordPage,
    public: true,
  },
  {
    path: "change-password",
    element: ChangePasswordPage,
  },
  {
    path: "register",
    element: GuardianRegisterPage,
    public: true,
  },
  {
    path: "*",
    element: NotFoundPage,
  },
];

export const adminRoutes = [
  { index: true, element: AdminSummaryPage, roles: [ROLE.ADMIN] },
  {
    path: "add-guardian",
    element: AddGuardianPage,
    roles: [ROLE.ADMIN, ROLE.TEACHER, ROLE.GUARDIAN],
  },
];

export const teacherRoutes = [
  { index: true, element: TeacherSummaryPage, roles: [ROLE.TEACHER] },
];

export const studentRoutes = [
  { index: true, element: StudentSummaryPage, roles: [ROLE.STUDENT] },
];

export const guardianRoutes = [
  { index: true, element: GuardianSummaryPage, roles: [ROLE.GUARDIAN] },
];
