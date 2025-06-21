import { ArrowClockwise, Plus } from "@phosphor-icons/react";
import { Tooltip } from "antd";
import React from "react";
import { IButtonProps } from "../types/IbuttonProps";

import { Container, TextoBtn } from "./styles";

export function BotaoAtualizar({
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
          <ArrowClockwise size={"1.2rem"} />
        </Container>
      ) : (
        <Container largura={largura} altura={altura} {...rest}>
          <ArrowClockwise size={"1.2rem"} />

          <TextoBtn>{texto ? texto : "Atualizar"}</TextoBtn>
        </Container>
      )}
    </>
  );
}
