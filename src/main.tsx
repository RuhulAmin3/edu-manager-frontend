/**
 * External Dependency
 */

import { App as AntdApp, ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { StrictMode } from "react";

/**
 * Internal Dependency
 */
  
import { store } from "~/redux/store";
import { router } from "~/routes";
import "./styles/globals.css"; 
import { antTheme } from "./common/constants/theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AntdApp>
      <ConfigProvider
        // wave={{ disabled: true }}
        theme={antTheme}
      > 
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ConfigProvider>
    </AntdApp>
  </StrictMode>
);
