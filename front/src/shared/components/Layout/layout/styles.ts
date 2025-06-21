import { Layout, Menu } from "antd";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
// import { MenuComponente } from '../../../layout/Menu/styles';

const { Header, Content, Footer, Sider } = Layout;

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

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
    backgroundColor: "#0000000",
    // background: "#33b300",

    // backgroundColor: "transparent important",
    // background: "transparent important",
  },
})`
  flex: 1;
`;

// export const Menus = styled(Menu).attrs({
//   style: {
//     background: "transparent",
//     border: "none",
//     // background: `${theme.colors.SecondaryGradiente}`,
//   },
// })`
//   flex: 1;
//   /* padding: 2rem; */
//   /* margin: -0.5rem; */
//   /* height: 100%; */
//   /* min-height: 100vh; */
// `;

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

export const MenuComponente = styled.div`
  display: flex;
  flex-direction: column;

  /* align-items: center; */
  /* justify-content: space-between; */
  flex: 1;

  margin: 20px 18px;

  color: ${(props) => props.theme.colors.menu.textColor};
  /* border-radius: 25px 0 0 25px; */
  /* background: var(--gray-50); */
  /* padding: 2rem; */

  background: transparent;
  /* height: 92vh; */
  /* box-shadow: inset 3px 3px 10px rgba(0, 0, 0, 0.114); */

  overflow: auto;
`;

// const AnimatedComponent = styled.div`
//   animation: ${(props) => props.senhasAnimation} 1s ease; // Use a classe de animação dinamicamente
// `;

export const SubMenuComponente = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 25px;
  color: ${(props) => props.theme.colors.menu.textColor};
  background: transparent;
  overflow: auto;
`;

export const SubSubMenuComponente = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 25px;
  color: ${(props) => props.theme.colors.menu.textColor};
  background: transparent;
  overflow: auto;
`;

export const Links = styled(Link).attrs({
  style: {
    // paddingTop: "10px",
  },
})`
  flex: 1;
  display: flex;
  align-items: center;

  margin-bottom: 30px;
`;

export const TextoMenu = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.small}px + 5;
  font-family: ${({ theme }) => theme.fonts.family.principal};
  /* color: ${({ theme }) => theme.colors.TableBackground}; */
  margin-left: 10px;
`;
