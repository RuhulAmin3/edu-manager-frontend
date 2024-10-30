/* eslint-disable @typescript-eslint/no-explicit-any */
import { createBrowserRouter } from "react-router-dom";
import { commonRoutes, layoutRoutes } from "./paths";

const routes = [
  ...commonRoutes.map((route) => {
    return { path: route.path, element: <route.element /> };
  }),

  ...layoutRoutes.map((route) => {
    return {
      path: route.path,
      element: <route.element />,
      children: route.children.map((route: any) => {
        return {
          ...route,
          element: <route.element />,
        };
      }),
    };
  }),
];

export const router = createBrowserRouter(routes);
