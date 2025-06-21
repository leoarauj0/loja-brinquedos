import theme from "@/shared/theme";
import { Layout, Menu } from "antd";
import styled from "styled-components";

const { Header, Content, Footer, Sider } = Layout;

export const Cabecalho = styled(Header).attrs({
  style: {
    // borderRadius: "25px",
    // boxShadow: "13px 3px 10px rgb(0, 0, 0)",
    // background: `${theme.colors.backgroundSecondary}`,
    // display: "flex",
  },
})`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* flex: 1; */
  /* background: ${(props) => props.theme.colors.backgroundSecondary}; */
  /* background: transparent; */
  /* padding: 2rem; */
  padding: 0.7rem;
  height: 8vh;
  /* min-height: 100vh; */
`;

export const Paginas = styled(Sider).attrs({
  style: {
    paddingTop: "10px",
  },
})`
  flex: 1;
`;

export const Menus = styled(Menu).attrs({
  style: {
    background: `transparent`,
    border: "none",
    // background: `${theme.colors.SecondaryGradiente}`,
  },
})`
  flex: 1;
  /* padding: 2rem; */
  /* margin: -0.5rem; */
  /* height: 100%; */
  /* min-height: 100vh; */
`;

export const Englobar = styled.div`
  /* display: flex; */
  /* flex: 1; */
  /* background: ${(props) => props.theme.colors.backgroundGradiente}; */
  /* padding: 2rem;
  margin: -0.5rem; */
  /* height: 100%; */
  /* min-height: 100vh; */

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

export const Conteudo = styled.div`
  display: flex;
  flex: 1;
  border-radius: 25px 0 0 25px;
  /* background: var(--gray-50); */
  /* padding: 2rem; */

  background: ${(props) => props.theme.colors.backgroundTerciary};
  height: 92vh;
  box-shadow: inset 3px 3px 10px rgba(0, 0, 0, 0.114);

  overflow: auto;
`;
