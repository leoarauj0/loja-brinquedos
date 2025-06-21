import React from "react";

import { Englobar, FundoComponente } from "./styles";

export default function Fundo({ children, ...props }) {
  return (
    <>
      <Englobar>
        <FundoComponente {...props}>{children}</FundoComponente>
      </Englobar>
    </>
  );
}
