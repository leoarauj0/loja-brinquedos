import { X } from "@phosphor-icons/react";
import { IButtonProps } from "../types/IbuttonProps";
import { Container, TextoBtn } from "./styles";

export function BotaoLimpar({
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
          <X size={"1.2rem"} />
        </Container>
      ) : (
        <Container largura={largura} altura={altura} {...rest}>
          <X size={"1.2rem"} />

          <TextoBtn>{texto ? texto : "Limpar"}</TextoBtn>
        </Container>
      )}
    </>
  );
}
