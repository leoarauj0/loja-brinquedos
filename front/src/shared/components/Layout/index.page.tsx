import React from "react";

import type { MenuProps } from "antd";

import TelasLayout from "./layout/index.page";
import { AuthProvider } from "@/pages/modules/login/context/AuthContext";

type MenuItem = Required<MenuProps>["items"][number];

export default function TelasLayoutAuth({ children, ...props }) {
  return (
    <AuthProvider>
      <TelasLayout>{children}</TelasLayout>
    </AuthProvider>
  );
}
