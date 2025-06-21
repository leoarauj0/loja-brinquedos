import React from "react";
import { IButtonProps } from "../types/IbuttonProps";

import { Container, TextoBtn } from "./styles";
import { Dna } from "@phosphor-icons/react";

export function BotaoDna({
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
          {rest.size === "small" ? (
            <Dna size={"1rem"} />
          ) : (
            <Dna size={"1.2rem"} />
          )}
        </Container>
      ) : (
        <Container largura={largura} altura={altura} {...rest}>
          {rest.size === "small" ? (
            <>
              <Dna size={"1.2rem"} />
              <TextoBtn>{texto}</TextoBtn>
            </>
          ) : (
            <>
              <Dna size={"1.2rem"} />
              <TextoBtn>{texto}</TextoBtn>
            </>
          )}
        </Container>
      )}
    </>
  );
}
