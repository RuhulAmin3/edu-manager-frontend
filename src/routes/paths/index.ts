
/**
 * Internal Dependency
 */ 
import GuardianRegisterPage from "~/pages/auth/guardian-register";
import ChangePasswordPage from "~/pages/auth/change-password";
import ForgotPasswordPage from "~/pages/auth/forgot-password";
import AddGuardianPage from "~/pages/guardian/add-guardian";
import StudentListPage from "~/pages/student/student-list";
import AddStudentPage from "~/pages/student/add-student";
import GuardianSummaryPage from "~/pages/guardian";
import StudentSummaryPage from "~/pages/student";
import TeacherSummaryPage from "~/pages/teacher";
import AdminSummaryPage from "~/pages/admin";
import NotFoundPage from "~/pages/not-found";
import LoginPage from "~/pages/auth/Login";
import ProfilePage from "~/pages/profile";
import ExamListPage from "~/pages/exam";
import StudentDetailsPage from "~/pages/student/student-details";
import StudentPromotionPage from "~/pages/student/student-promotion";
import TeacherListPage from "~/pages/teacher/teacher-list";
import AddTeacherPage from "~/pages/teacher/add-teacher";
import TeacherDetailsPage from "~/pages/teacher/teacher-details";
import GuardianListPage from "~/pages/guardian/guardian-list";
import GuardianDetailsPage from "~/pages/guardian/guardian-details";
import TeacherPaymentList from "~/pages/teacher/teacher-payments";
import App from "~/App";
import ClassListPage from "~/pages/class";
import SubjectListPage from "~/pages/subject"; 
import ExamResultListPage from "~/pages/exam-result";
import FeeListPage from "~/pages/fee";
import ExpenseListPage from "~/pages/expense";
import AttendenceListPage from "~/pages/attendence";
import AddAttendencePage from "~/pages/attendence/add-attendence";
import NoticeListPage from "~/pages/notice";
import LeaderboardPage from "~/pages/leaderboard";
import EditStudentPage from "~/pages/student/edit-student";


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

  // admin student route
  {path: "students", element:StudentListPage},
  {path: "add-student", element:AddStudentPage}, 
  {path: "students/:id", element:StudentDetailsPage},
  {path: "update-student/:id", element:EditStudentPage},
  {path: "student-promotion/:id", element:StudentPromotionPage},

  // admin teacher route
  {path: "teachers", element:TeacherListPage},
  {path: "add-teacher", element:AddTeacherPage}, 
  {path: "teachers/:id", element:TeacherDetailsPage},
  {path: "payments", element:TeacherPaymentList},

  // admin guardian route
  {path: "guardians", element:GuardianListPage},
  {path: "add-guardian", element:AddGuardianPage}, 
  {path: "guardians/:id", element:GuardianDetailsPage},

  // class and subject route
  {path: "classes", element:ClassListPage},
  {path: "subjects", element:SubjectListPage},

  // examination routes
  {path:"exams", element:ExamListPage},
  {path:"exam-result", element:ExamResultListPage},

  // acount management routes
  {path:"fees", element:FeeListPage},
  {path:"expenses", element:ExpenseListPage},

  // attendence management routes
  {path:"attendences", element:AttendenceListPage},
  {path:"add-attendence", element:AddAttendencePage},

  // notice route
  {path: "notices", element:NoticeListPage},

  // leaderboard route
  {path: "leaderboard", element:LeaderboardPage},
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
