import { Layout } from "antd";
import styled from "styled-components";

export const FundoComponente = styled(Layout)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  /* padding: 2rem; */
  /* margin: -0.5rem; */
  height: 100%;
  min-height: 100vh;
`;

export const Englobar = styled.div`
  ::-webkit-scrollbar-track {
    background-color: transparent;
    margin: 20px;
  }
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.backgroundGradienteVertical};
    border-radius: 5px;
  }
`;
