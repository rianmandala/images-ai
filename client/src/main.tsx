import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import "./index.css";
import "./config/firebase-config";
import { UserProvider } from "./context/user";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#7421D9",
          },
        }}
      >
        <StyleProvider hashPriority="high">
          <UserProvider>
            <App />
          </UserProvider>
        </StyleProvider>
      </ConfigProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
