import App from "../../App";
import AdminSummaryPage from "../../pages/admin";
import AddGuardianPage from "../../pages/guardian/add-guardian";
import ChangePasswordPage from "../../pages/auth/change-password";
import ForgotPasswordPage from "../../pages/auth/forgot-password";
import GuardianRegisterPage from "../../pages/auth/guardian-register";
import LoginPage from "../../pages/auth/login";
import GuardianSummaryPage from "../../pages/guardian";
import NotFoundPage from "../../pages/not-found";
import ProfilePage from "../../pages/profile";
import StudentSummaryPage from "../../pages/student";
import TeacherSummaryPage from "../../pages/teacher";

export const commonRoutes = [
  {
    path: "/", // Home page route
    element: App, // Home page
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
  { index: true, element: AdminSummaryPage },
  { path: "add-guardian", element: AddGuardianPage },
  { path: "profile", element: ProfilePage },
];

export const teacherRoutes = [
  { index: true, element: TeacherSummaryPage },
  { path: "profile", element: ProfilePage },
];

export const studentRoutes = [
  { index: true, element: StudentSummaryPage },
  { path: "profile", element: ProfilePage },
];

export const guardianRoutes = [
  { index: true, element: GuardianSummaryPage },
  { path: "profile", element: ProfilePage },
];
