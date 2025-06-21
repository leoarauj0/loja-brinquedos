import theme from "@/shared/theme";
import { Button, ButtonProps } from "antd";
import { ButtonShape } from "antd/es/button";
import styled from "styled-components";
import { IButtonProps } from "../types/IbuttonProps";

interface Props extends ButtonProps {
  largura?: string;
  altura?: string;
  shape?: ButtonShape;
}
export const Container = styled(Button).attrs(
  (props: IButtonProps) =>
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
        background: `${
          props.disabled
            ? null
            : props.danger
            ? theme.colors.dangerGradiente
            : theme.colors.SecondaryGradiente
        }`,

        ...props.style,
      },
      shape: props.shape,
    } as ButtonProps)
)<Props>`
  width: ${(props) => props.largura};
  height: ${(props) => props.altura};
  font-family: ${(props) => props.theme.fonts.family.secundaria};
`;

// export const Btn = styled(Button).attrs((props) => ({
//   style: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: "8px",
//     borderRadius: "25px",
//     boxShadow: "5px 5px 25px rgba(0, 0, 0, 0.45)",
//     color: "#fff",
//     border: "none",
//     background: `${theme.colors.SecondaryGradiente}`,
//   },
//   shape: props.shape,
// }))<Props>`
//   width: ${(props) => props.largura};
//   height: ${(props) => props.altura};
//   font-family: ${(props) => props.theme.fonts.family.secundaria};
// `;

export const TextoBtn = styled.p`
  /* margin-top: 2px; */
  // paddingTop: "12px",
`;

export const Icon = styled.div`
  /* margin-top: 2px; */
  margin-top: 6px;
`;
