import { Form } from "antd";
import { MaskedInputProps } from "antd-mask-input/build/main/lib/MaskedInput";

interface PropsInput extends MaskedInputProps {
  textoInterno: string;
  titulo: string;
  nome: string;
  required?: boolean;
  rules?;
}

import { LabelComponent, Mask } from "./styles";

export function MaskedInput({
  titulo,
  textoInterno,
  nome,
  required,
  rules,
  ...rest
}: PropsInput) {
  return (
    <Form.Item
      name={nome}
      label={<LabelComponent>{titulo}</LabelComponent>}
      required={required}
      rules={rules}
    >
      <Mask placeholder={textoInterno} {...rest} />
    </Form.Item>
  );
}
