import { CardProps, Col, Row, Space, Card } from "antd";
import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  .title {
    @media screen and (max-width: 375px) {
      button {
        p {
          display: none;
        }
      }
    }
  }
`;

interface PropsCard extends CardProps {
  children: React.ReactNode;
}

export const Cards = styled(Card).attrs({
  style: {
    // width: "100%",
    padding: "10px",
    borderRadius: "1rem",
    marginBottom: 10,
    overflow: "auto",
  },
} as PropsCard)<PropsCard>`
  box-shadow: 7px 7px 35px rgba(0, 0, 0, 0.15);
  ::-webkit-scrollbar-track {
    background-color: transparent;
    margin: 10px;
  }
  ::-webkit-scrollbar {
    width: 6px;
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: #dad7d7;
    border-radius: 5px;
  }
`;

export const Topo = styled.div`
  // width: "95.5vw",
  height: 3.5rem;
  border-radius: 5rem;
  margin-bottom: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  box-shadow: 7px 7px 35px rgba(0, 0, 0, 0.15);

  padding: 0.5rem 1.5rem;
`;

export const Pe = styled.div`
  // width: "95.5vw",
  height: 2.5rem;
  border-radius: 5rem;
  /* margin-bottom: 10px; */

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  box-shadow: 7px 7px 35px rgba(0, 0, 0, 0.15);

  padding: 15px 0px 0px 0px;
`;

export const Content = styled.div``;

export const Header = styled(Space)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  word-break: break-all;

  @media (max-width: 450px) {
    button {
      p {
        display: none;
      }
    }
  }
`;

export const Titulo = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.extraLarge}px;
  font-family: ${({ theme }) => theme.fonts.family.principal};
  color: ${({ theme }) => theme.colors.textColorPrimary};

  margin-bottom: 1rem;
`;

export const SubTitulo = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.large}px;
  font-family: ${({ theme }) => theme.fonts.family.principal};
  color: ${({ theme }) => theme.colors.textColorPrimary};

  margin-bottom: 1rem;
`;

export const Texto = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.regular}px;
  font-family: ${({ theme }) => theme.fonts.family.principal};
  color: ${({ theme }) => theme.colors.textColorPrimary};

  span {
    color: ${({ theme }) => theme.colors.textColorPrimary};
    font-size: ${({ theme }) => theme.fonts.sizes.medium}px;
  }
`;

export const TextoSmall = styled.div`
  display: flex;
  font-size: ${({ theme }) => theme.fonts.sizes.small}px;
  font-family: ${({ theme }) => theme.fonts.family.principal};
  color: ${({ theme }) => theme.colors.textColorSecondary};
`;

export const Coluna = styled(Col).attrs({
  // flex: "1 1 230px",
})`
  display: "flex";
  flex-direction: "row";
`;

export const Linha = styled(Row).attrs({
  gutter: 18,
})`
  @media (min-width: 575px) {
    margin: 0 -100px;
  }
`;
