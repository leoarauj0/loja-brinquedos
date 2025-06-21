import { Pencil, ShieldCheck } from "@phosphor-icons/react";
import { Tooltip } from "antd";
import React from "react";
import { IButtonProps } from "../types/IbuttonProps";

import { Container, TextoBtn } from "./styles";

export function BotaoIdentificar({
  largura,
  altura,
  shape,
  texto,
  ...rest
}: IButtonProps) {
  return (
    <>
      {shape == "circle" ? (
        <Container shape={shape} {...rest}>
          <ShieldCheck size={"1.2rem"} />
        </Container>
      ) : (
        <Container largura={largura} altura={altura} {...rest}>
          <ShieldCheck size={"1.2rem"} />
          <TextoBtn>{texto ? texto : "Identificar"}</TextoBtn>
        </Container>
      )}
    </>
  );
}
