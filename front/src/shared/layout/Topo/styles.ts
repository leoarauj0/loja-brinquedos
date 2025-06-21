import React from "react";
import { Breadcrumb, Card, CardProps, Col, Row, Button } from "antd";
import styled from "styled-components";

interface PropsCard extends CardProps {
  children: React.ReactNode;
}

export const Container = styled.div`
  // width: "95.5vw",
  height: 3rem;
  border-radius: 5rem;
  margin-bottom: 10px;
  // padding: -1,
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  box-shadow: 7px 7px 35px rgba(0, 0, 0, 0.15);

  padding: 1rem;
`;
//   style: {

//   },
// } as PropsCard)<PropsCard>``;

export const Coluna = styled(Col).attrs({
  // flex: "1 1 200px",
})``;

export const Linha = styled(Row).attrs({
  gutter: 18,
  style: {
    width: "100vw",
  },
})``;

export const Migalhas = styled(Breadcrumb).attrs({
  style: {
    marginTop: "4px",
  },
})``;

export const Sair = styled(Button).attrs({
  style: {
    marginLeft: "auto",
  },
})``;
