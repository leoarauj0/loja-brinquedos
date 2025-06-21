import { MagnifyingGlass } from "@phosphor-icons/react";
import { Tooltip } from "antd";
import React from "react";
import { IButtonProps } from "../types/IbuttonProps";

import { Container, TextoBtn } from "./styles";

export function BotaoPesquisar({
  largura,
  altura,
  texto,
  shape,
  loading,
  ...rest
}: IButtonProps) {
  return (
    <>
      {shape == "circle" ? (
        <Container shape={shape} loading={loading} {...rest}>
          {loading ? null : <MagnifyingGlass size={"1.2rem"} />}
        </Container>
      ) : (
        <Container
          largura={largura}
          altura={altura}
          loading={loading}
          {...rest}
        >
          {loading ? null : <MagnifyingGlass size={"1.2rem"} />}
          <TextoBtn>{texto ? texto : "Pesquisar"}</TextoBtn>
        </Container>
      )}
    </>
  );
}
