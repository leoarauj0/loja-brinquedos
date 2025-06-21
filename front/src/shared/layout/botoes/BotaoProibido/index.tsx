import React from "react";
import { IButtonProps } from "../types/IbuttonProps";

import { Container, TextoBtn } from "./styles";
import { Prohibit } from "@phosphor-icons/react";
import { Tooltip } from "antd";

export function BotaoProibido({
  largura,
  altura,
  shape,
  texto,
  ...rest
}: IButtonProps) {
  return (
    <>
      {shape == "circle" ? (
        <Tooltip title={texto ?? "proibido"}>
          <Container shape={shape} {...rest}>
            <Prohibit size={"1rem"} />
          </Container>
        </Tooltip>
      ) : (
        <Container largura={largura} altura={altura} {...rest}>
          <Prohibit size={"1rem"} />
          <TextoBtn>{texto ? texto : "Indisponível"}</TextoBtn>
        </Container>
      )}
    </>
  );
}
