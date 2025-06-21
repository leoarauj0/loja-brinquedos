import { Form, InputProps } from "antd";

const { Item } = Form;

interface PropsInput extends InputProps {
  textoInterno: string;
  titulo: string;
  nome: string;
  rules?;
}

import { EntradaComponente, LabelComponent } from "./styles";

export function Entrada({
  titulo,
  textoInterno,
  nome,
  rules,
  ...rest
}: PropsInput) {
  return (
    <Item
      name={nome}
      label={<LabelComponent>{titulo}</LabelComponent>}
      rules={rules}
    >
      <EntradaComponente placeholder={textoInterno} {...rest} />
    </Item>
  );
}
