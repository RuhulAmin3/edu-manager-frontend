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
    path: `/admin`,
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
    path: `/teacher`,
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
    path: `/student`,
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
    path: `/guardian`,
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
