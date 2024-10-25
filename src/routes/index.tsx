import { createBrowserRouter } from "react-router-dom";
import { commonRoutes } from "./paths";

export const routes = createBrowserRouter([
  ...commonRoutes.map((route) => {
    return { path: route.path, element: <route.element /> };
  }),
]);
