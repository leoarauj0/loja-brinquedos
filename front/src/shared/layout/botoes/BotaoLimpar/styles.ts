import theme from "@/shared/theme";
import { Button, ButtonProps } from "antd";
import { ButtonShape } from "antd/es/button";
import styled from "styled-components";

interface Props extends ButtonProps {
  largura?: string;
  altura?: string;
  shape?: ButtonShape;
}

const circle = `${(props: Props) => props.shape}`;

export const Container = styled(Button).attrs(
  (props: Props) =>
    ({
      style: {
        display: "flex",
        // flex: "0 1 33px",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        borderRadius: "25px",
        boxShadow: `${
          props.disabled ? null : "5px 5px 25px rgba(0, 0, 0, 0.45)"
        }`,
        color: `${props.disabled ? null : theme.colors.backgroundSecondary}`,
        border: "none",
        background: `${props.disabled ? null : theme.colors.dangerGradiente}`,
      },
      shape: props.shape,
      // disabled: props.disabled,
    } as ButtonProps)
)<Props>`
  width: ${(props) => props.largura};
  height: ${(props) => props.altura};
  font-family: ${(props) => props.theme.fonts.family.secundaria};
`;

export const TextoBtn = styled.p`
  /* margin-top: 2px; */
`;
