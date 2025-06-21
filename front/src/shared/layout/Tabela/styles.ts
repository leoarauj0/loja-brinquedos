import { Table } from "antd";
import styled from "styled-components";

export const TabelaComponente = styled(Table).attrs({
  // scroll: { x: 300 },
})`
  .ant-table-thead .ant-table-cell {
    background: ${(props) => props.theme.colors.TableGradiente};
  }

  td .ant-table-row-expand-icon-cell {
    background: ${(props) => props.theme.colors.TableBackground} !important;
  }

  tr:hover {
    background: #f0f0f083;
  }

  .ant-pagination .ant-table-pagination .ant-table-pagination-right {
    margin-right: 20px !important;
  }

  .table-row-destaque {
    background: ${(props) => props.theme.colors.PrimaryGradiente} !important;
    color: white;
    text-shadow: black 0.1em 0.1em 0.2em;
  }

  .table-row-sucesso {
    background: ${(props) => props.theme.colors.successGradiente} !important;
    color: white;
    text-shadow: black 0.1em 0.1em 0.2em;
  }
`;
