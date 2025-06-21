import { Select, SelectProps } from 'antd';
import styled from 'styled-components';

export const LabelComponent = styled.div`
  font-family: ${({ theme }) => theme.fonts.family.principal};
  font-size: ${({ theme }) => theme.fonts.sizes.small}px;
  box-shadow: "5px 5px 12px rgba(0, 0, 0, 0.70)";
`;