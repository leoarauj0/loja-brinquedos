import { DatePicker, Input, Select, SelectProps } from "antd";
import { DatePickerProps } from "antd/lib";
import styled from "styled-components";

export const LabelComponent = styled.div`
  font-family: ${({ theme }) => theme.fonts.family.principal};
  /* font-size: ${({ theme }) => theme.fonts.sizes.small}px; */
  box-shadow: "5px 5px 12px rgba(0, 0, 0, 0.70)";
`;

// export const DataComponente = styled(Input).attrs(
export const DataComponente = styled(DatePicker).attrs((props) => ({
  style: {
    boxShadow: "4px 4px 17px rgba(0, 0, 0, 0.15)",
    ...props.style,
  },
}))`
  &[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  &[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
`;
