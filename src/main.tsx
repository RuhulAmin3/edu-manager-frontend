import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/index.tsx";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#00b96b",
          borderRadius: 2,

          // Alias Token
          colorBgContainer: "#f6ffed",
        },
      }}
    />
    <RouterProvider router={routes} />
  </StrictMode>
);
