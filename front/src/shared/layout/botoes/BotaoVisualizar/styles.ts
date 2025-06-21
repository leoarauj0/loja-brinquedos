import theme from "@/shared/theme";
import { Button, ButtonProps } from "antd";
import { ButtonShape } from "antd/es/button";
import styled from "styled-components";
import { IButtonProps } from "../types/IbuttonProps";

interface Props extends ButtonProps {
  largura?: string;
  altura?: string;
}

const circle = `${(props: Props) => props.shape}`;

export const Container = styled(Button).attrs((props : Props) => ({
  style: {
    flex: "0 50px 1 33px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    borderRadius: "25px",
    boxShadow: `${props.disabled ? null : "5px 5px 25px rgba(0, 0, 0, 0.45)"}`,
    color: `${props.disabled ? null : theme.colors.backgroundSecondary}`,
    border: "none",
    background: `${props.disabled ? null : theme.colors.SecondaryGradiente}`,
    // ...props.style,
  },
  shape: props.shape,
  disabled: props.disabled,
} as ButtonProps ))<Props>`
  
  width: ${(props) => props.largura};
  height: ${(props) => props.altura};
  font-family: ${(props) => props.theme.fonts.family.secundaria};
`;

export const TextoBtn = styled.p`
  /* margin-top: 2px; */
`;
