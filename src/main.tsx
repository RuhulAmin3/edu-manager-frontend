import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { App as AntdApp } from "antd";

import { routes } from "./routes/index.tsx";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { EDU_MANAGER_TOKENS } from "./styles/token.ts";
import "./styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AntdApp>
      <ConfigProvider
        // wave={{ disabled: true }}
        theme={{
          token: {
            colorPrimary: EDU_MANAGER_TOKENS.colors["edu-primary"],
            colorBorder: EDU_MANAGER_TOKENS.colors["edu-border-color"],
            colorSuccess: EDU_MANAGER_TOKENS.colors["edu-success"],
            colorInfo: EDU_MANAGER_TOKENS.colors["edu-info"],
            colorWarning: EDU_MANAGER_TOKENS.colors["edu-warning"],
            colorError: EDU_MANAGER_TOKENS.colors["edu-danger"],
            fontFamily: "Be Vietnam Pro, sans-serif",
          },
          components: {
            Button: {
              // default or secondary button customization
              contentFontSizeSM: 12,
              borderRadiusSM: 4,
              paddingBlockSM: 4.8,
              paddingInlineSM: 12,
              controlHeightSM: 28,

              // middle button customization
              contentFontSize: 14,
              borderRadius: 6,

              // large button customization
              contentFontSizeLG: 16,
              borderRadiusLG: 8,
            },
          },
        }}
      >
        {" "}
        <Provider store={store}>
          <RouterProvider router={routes} />
        </Provider>
      </ConfigProvider>
    </AntdApp>
  </StrictMode>
);
