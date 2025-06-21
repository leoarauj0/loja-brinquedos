import { Spin } from "antd";
import React from "react";
import { Container, Girar } from "./styles";

interface Props {
  loading: boolean;
  children: React.ReactNode;
  texto: string;
}

export function Loading({ loading, texto, children }: Props) {
  return (
    <Container>
      <Spin tip={texto} spinning={loading} indicator={<Girar />}>
        {children}
      </Spin>
    </Container>
  );
}
