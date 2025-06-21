import React from "react";
import { IButtonProps } from "../types/IbuttonProps";

import { Container, TextoBtn } from "./styles";
import { Eye } from "@phosphor-icons/react";
import { Tooltip } from "antd";

export function BotaoVisualizar({
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
          <Eye size={"1rem"} />
        </Container>
      ) : (
        <Container largura={largura} altura={altura} {...rest}>
          <Eye size={"1rem"} />
          <TextoBtn>{texto ? texto : "Visualizar"}</TextoBtn>
        </Container>
      )}
    </>
  );
}
