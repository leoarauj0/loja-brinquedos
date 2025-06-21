import { DatePicker, Form, InputProps } from "antd";

const { Item } = Form;

interface PropsDate extends InputProps {
  textoInterno?: string;
  titulo?: string;
  nome: string;
  onChange?: (value?: any) => void;
  opcao1?: string;
  opcao2?: string;

  required?: boolean;
  disabled?: boolean;
  valor?: boolean;
}

import { EntradaComponente, LabelComponent } from "./styles";

export function Trocar({
  titulo,
  textoInterno,
  nome,
  required,
  onChange,
  opcao1,
  opcao2,
  disabled,
  valor,
  ...rest
}: PropsDate) {
  return (
    <Form.Item
      name={nome}
      label={<LabelComponent>{titulo}</LabelComponent>}
      rules={[{ required: required, message: "Por favor, insira " + titulo }]}
    >
      <EntradaComponente
        style={{ width: "100%" }}
        onChange={(value) => {
          onChange !== undefined && onChange(value);
        }}
        checkedChildren={opcao1 ? opcao1 : "Sim"}
        unCheckedChildren={opcao2 ? opcao2 : "Não"}
        disabled={disabled}
        defaultChecked={valor}
      />
    </Form.Item>
  );
}
