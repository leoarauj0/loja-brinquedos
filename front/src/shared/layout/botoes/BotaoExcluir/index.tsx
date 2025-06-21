import { Trash } from "@phosphor-icons/react";
import { Tooltip } from "antd";
import React from "react";
import { IButtonProps } from "../types/IbuttonProps";

import { Container, TextoBtn } from "./styles";

export function BotaoExcluir({
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
          {rest.size === "small" ? (
            <Trash size={"1rem"} />
          ) : (
            <Trash size={"1.2rem"} />
          )}
        </Container>
      ) : (
        <Container largura={largura} altura={altura} {...rest}>
          {rest.size === "small" ? (
            <>
              <Trash size={"1rem"} />
              <TextoBtn>{texto ? texto : "Excluir"}</TextoBtn>
            </>
          ) : (
            <>
              <Trash size={"1.2rem"} />
              <TextoBtn>{texto ? texto : "Excluir"}</TextoBtn>
            </>
          )}
        </Container>
      )}
    </>
  );
}
