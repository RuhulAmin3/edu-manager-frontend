/**
 * External Dependency
 */ 
import { createBrowserRouter } from "react-router-dom";
/**
 * Internal Dependency
 */ 
import {adminRoutes, commonRoutes, guardianRoutes, studentRoutes, teacherRoutes} from "./paths";
import PrivateRouteGuard from "./private-route-guard";
import PublicRouteGuard from "./public-route-guard";
import { ROLE } from "~/common/constants"; 
import RootLayout from "~/layouts";

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
        <PrivateRouteGuard requiredRoles={[ROLE.ADMIN]}>
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
        <PrivateRouteGuard requiredRoles={[ROLE.TEACHER]}>
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
        <PrivateRouteGuard requiredRoles={[ROLE.STUDENT]}>
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
        <PrivateRouteGuard requiredRoles={[ROLE.GUARDIAN]}>
          <route.element />
        </PrivateRouteGuard>
      ),
    })),
  },
];

export const router = createBrowserRouter(routes);
