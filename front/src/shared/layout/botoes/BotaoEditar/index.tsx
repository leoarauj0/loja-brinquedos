import { Pencil } from "@phosphor-icons/react";
import { Tooltip } from "antd";
import React from "react";
import { IButtonProps } from "../types/IbuttonProps";

import { Container, TextoBtn } from "./styles";

interface Props extends IButtonProps {
  tamanhoIcone?: string;
}

export function BotaoEditar({
  largura,
  altura,
  tamanhoIcone,
  shape,
  texto,
  ...rest
}: Props) {
  return (
    <>
      {shape == "circle" ? (
        <Container shape={shape} {...rest}>
          <Pencil size={tamanhoIcone ? tamanhoIcone : "1.2rem"} />
        </Container>
      ) : (
        <Container largura={largura} altura={altura} {...rest}>
          <Pencil size={tamanhoIcone ? tamanhoIcone : "1.2rem"} />
          <TextoBtn>{texto ? texto : "Editar"}</TextoBtn>
        </Container>
      )}
    </>
  );
}
