import { Input, InputProps } from "antd";
import styled from "styled-components";

export const LabelComponent = styled.div`
  font-family: ${({ theme }) => theme.fonts.family.principal};
  font-size: ${({ theme }) => theme.fonts.sizes.small}px;
`;

export const EntradaComponente = styled(Input).attrs({
  style: {
    boxShadow: "7px 7px 35px rgba(0, 0, 0, 0.15)",
  },
} as InputProps)`
  &[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  &[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
`;
