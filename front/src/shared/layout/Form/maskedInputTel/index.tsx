import { Form, Input } from "antd";
import { MaskedInputProps } from "antd-mask-input/build/main/lib/MaskedInput";
import InputMask from "react-input-mask";
interface PropsInput extends MaskedInputProps {
  textoInterno: string;
  titulo: string;
  nome: string;
  required?: boolean;
  rules?;
}

import { LabelComponent, Mask } from "./styles";

export function MaskedInputTel({
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
        mask="(99) 99999-9999"
        // value={value}
        // onChange={onChange}
      >
        {(inputProps) => <Input {...inputProps} />}
      </InputMask>
    </Form.Item>
  );
}
