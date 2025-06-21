import { MaskedInput } from "@/shared/layout/Form/maskedInput";
import theme from "@/shared/theme";
import { Table } from "antd";
import styled from "styled-components";

export const Tabela = styled(Table).attrs({
  style: {
    borderRadius: "25px",
    boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.114)",
    background: `${theme.colors.SecondaryGradiente}`,
    // thead: {
    //   backgroundColor: "#237804 !important;", // prod: #3F51B5 homol: #237804,
    //   color: "#ffff",
    // },
  },
})``;

export const Container = styled.div`
  // width: "95.5vw",
  height: 3rem;
  border-radius: 5rem;
  margin: 0 0 10px 0;
  // padding: -1,
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  box-shadow: 7px 7px 35px rgba(0, 0, 0, 0.15);

  padding: 1rem;
`;

export const Titulo = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.extraLarge}px;
  font-family: ${({ theme }) => theme.fonts.family.principal};
  color: ${({ theme }) => theme.colors.textColorPrimary};
`;

export const SubTitulo = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.large}px;
  font-family: ${({ theme }) => theme.fonts.family.principal};
  color: ${({ theme }) => theme.colors.textColorPrimary};
`;

export const TituloTabela = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.regular}px;
  font-family: ${({ theme }) => theme.fonts.family.principal};
  color: ${({ theme }) => theme.colors.textColorPrimary};
`;

export const Texto = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.small}px;
  font-family: ${({ theme }) => theme.fonts.family.principal};
  color: ${({ theme }) => theme.colors.textColorPrimary};
`;

// export const InputMasked = styled(MaskedInput)`
//   border-radius: 50px;
// `;

export const TopoTelas = styled.div`
  // width: "95.5vw",
  height: 2.5rem;
  border-radius: 5rem;
  margin-bottom: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  box-shadow: 7px 7px 35px rgba(0, 0, 0, 0.15);

  padding: 0.5rem 1.5rem;
`;
