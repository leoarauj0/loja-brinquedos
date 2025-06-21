import { Form, InputProps } from "antd";

const { Item } = Form;

interface PropsInput extends InputProps {
  textoInterno: string;
  titulo: string;
  nome: string;
}

import { EntradaComponente, LabelComponent } from "./styles";

export function InputClean({
  titulo,
  textoInterno,
  nome,
  ...rest
}: PropsInput) {
  return <EntradaComponente placeholder={textoInterno} {...rest} />;
}
