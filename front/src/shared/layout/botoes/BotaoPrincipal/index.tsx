import React from "react";
import { IButtonProps } from "../types/IbuttonProps";
import { Container, Icon, TextoBtn } from "./styles";

interface Props extends IButtonProps {
  texto?: string;
  largura?: string;
  altura?: string;
  icon?: React.ReactNode;
  tipo?: "primary" | "secondary" | "default";
}

export function BotaoPrincipal({
  texto,
  largura,
  altura,
  icon,
  shape,
  ...rest
}: Props) {
  return (
    <>
      {shape == "circle" ? (
        <Container shape={shape} {...rest}>
          <Icon>{icon}</Icon>
        </Container>
      ) : (
        <Container largura={largura} altura={altura} {...rest}>
          <Icon>{icon}</Icon>
          <TextoBtn>{texto}</TextoBtn>
        </Container>
      )}
    </>
  );
}
