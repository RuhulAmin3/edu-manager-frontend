import GuardianRegisterPage from "../../pages/auth/guardian-register";
import ChangePasswordPage from "../../pages/auth/change-password";
import ForgotPasswordPage from "../../pages/auth/forgot-password";
import AddGuardianPage from "../../pages/guardian/add-guardian";
import GuardianSummaryPage from "../../pages/guardian";
import StudentSummaryPage from "../../pages/student";
import TeacherSummaryPage from "../../pages/teacher";
import NotFoundPage from "../../pages/not-found";
import AdminSummaryPage from "../../pages/admin";
import LoginPage from "../../pages/auth/login";
import ProfilePage from "../../pages/profile";
import ExamListPage from "../../pages/exam";
import App from "../../App";

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
  { path: "exams", element: ExamListPage },
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
