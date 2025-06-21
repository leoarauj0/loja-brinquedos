import React from "react";
import { Card, CardProps } from "antd";
import styled from "styled-components";

interface PropsCard extends CardProps {
  children: React.ReactNode;
}

export const Container = styled(Card).attrs({
  style: {
    width: "100%",
    borderRadius: "1rem",
    marginBottom: 10,
  },
} as PropsCard)<PropsCard>`
  box-shadow: 7px 7px 35px rgba(0, 0, 0, 0.15);
`;
