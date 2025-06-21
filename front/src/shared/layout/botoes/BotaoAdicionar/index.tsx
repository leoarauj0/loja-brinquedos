import { Plus } from "@phosphor-icons/react";
import { Tooltip } from "antd";
import React from "react";
import { IButtonProps } from "../types/IbuttonProps";

import { Container, TextoBtn } from "./styles";

export function BotaoAdicionar({
  texto,
  largura,
  altura,
  shape,
  ...rest
}: IButtonProps) {
  return (
    <>
      {shape == "circle" ? (
        <Container shape={shape} {...rest}>
          <Plus size={"1.2rem"} />
        </Container>
      ) : (
        <Container largura={largura} altura={altura} {...rest}>
          <Plus size={"1.2rem"} />
          <TextoBtn>{texto ? texto : "Adicionar"}</TextoBtn>
        </Container>
      )}
    </>
  );
}
