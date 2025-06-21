import { Form, InputProps } from "antd";

const { Item } = Form;

interface PropsDate extends InputProps {
  textoInterno?: string;
  titulo?: string;
  nome: string;
  size?;
  required?: boolean;
  onChange?;
  sombra?: boolean;
  disabled?: boolean;
}

import theme from "@/shared/theme";
import { DataComponente, LabelComponent } from "./styles";

export function Data({
  titulo,
  textoInterno,
  nome,
  required,
  size,
  onChange,
  sombra,
  disabled,

  ...rest
}: PropsDate) {
  return (
    <Form.Item
      name={nome}
      label={
        sombra === false ? (
          titulo
        ) : (
          <LabelComponent
            style={{
              fontSize:
                size === "large"
                  ? theme.fonts.sizes.medium
                  : theme.fonts.sizes.small,
            }}
          >
            {titulo}
          </LabelComponent>
        )
      }
      rules={[{ required: required, message: "Por favor, insira " + titulo }]}
    >
      <DataComponente
        placeholder={textoInterno}
        format={"DD/MM/YYYY"}
        style={{ width: "100%" }}
        size={size}
        onChange={onChange}
        disabled={disabled}
      />

      {/* <input

        type="date"
        id="start"
        name="trip-start"
        value="2018-07-22"
        min="2018-01-01"
        max="2018-12-31"
      /> */}
    </Form.Item>
  );
}
