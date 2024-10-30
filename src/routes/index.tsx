import { createBrowserRouter } from "react-router-dom";
import {
  adminRoutes,
  commonRoutes,
  guardianRoutes,
  studentRoutes,
  teacherRoutes,
} from "./paths";
import RootLayout from "../layouts";
import PublicRouteGuard from "./public-route-guard";
import PrivateRouteGuard from "./private-route-guard";
import { USER } from "../common/constants/local-storage.constant";
import { getFromLocalStorage } from "../common/utils/local-storage.utils";

const user: Record<string, string> | null = getFromLocalStorage(USER);

const routes = [
  ...commonRoutes.map((route) => {
    if (route?.public) {
      return {
        path: route.path,
        element: (
          <PublicRouteGuard>
            <route.element />
          </PublicRouteGuard>
        ),
      };
    }
    return { path: route.path, element: <route.element /> };
  }),
  {
    path: `/${user?.role.toLowerCase()}`,
    element: <RootLayout />,
    children: adminRoutes.map((route) => ({
      ...route,
      element: (
        <PrivateRouteGuard requiredRoles={route.roles}>
          <route.element />
        </PrivateRouteGuard>
      ),
    })),
  },
  {
    path: `/${user?.role.toLowerCase()}`,
    element: <RootLayout />,
    children: teacherRoutes.map((route) => ({
      ...route,
      element: (
        <PrivateRouteGuard requiredRoles={route.roles}>
          <route.element />
        </PrivateRouteGuard>
      ),
    })),
  },
  {
    path: `/${user?.role.toLowerCase()}`,
    element: <RootLayout />,
    children: studentRoutes.map((route) => ({
      ...route,
      element: (
        <PrivateRouteGuard requiredRoles={route.roles}>
          <route.element />
        </PrivateRouteGuard>
      ),
    })),
  },
  {
    path: `/${user?.role.toLowerCase()}`,
    element: <RootLayout />,
    children: guardianRoutes.map((route) => ({
      ...route,
      element: (
        <PrivateRouteGuard requiredRoles={route.roles}>
          <route.element />
        </PrivateRouteGuard>
      ),
    })),
  },
];

export const router = createBrowserRouter(routes);
