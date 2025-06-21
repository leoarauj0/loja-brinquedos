import { Form, Input } from "antd";
import { MaskedInputProps } from "antd-mask-input/build/main/lib/MaskedInput";
import InputMask from "react-input-mask";
interface PropsInput {
  textoInterno: string;
  titulo: string;
  nome: string;
  required?: boolean;
  rules?;
}

import { LabelComponent, Mask } from "./styles";

export function MaskedInputNascimento({
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
      {/* <Mask placeholder={textoInterno} {...rest} /> */}

      <InputMask
        mask="99/99/9999"
        // value={value}
        // onChange={onChange}
      >
        {(inputProps) => <Input placeholder={textoInterno} {...inputProps} />}
      </InputMask>
    </Form.Item>
  );
}
