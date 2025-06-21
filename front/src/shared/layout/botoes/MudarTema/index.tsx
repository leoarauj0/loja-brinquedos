import "@theme-toggles/react/css/Classic.css";
import { Classic } from "@theme-toggles/react";
import React from "react";

//botão para mudar o tema
export function MudarTema() {
  return <Classic duration={750} style={{ fontSize: "30px" }} />;
}
