import { Form, Select, SelectProps } from "antd";

const { Item } = Form;
const { Option } = Select;

interface PropsSelect extends SelectProps {
  textoInterno?: string;
  titulo?: string;
  nome: string;
  opcoes?: {
    id: string | number | boolean | undefined | null;
    nome?: string | undefined;
    descricao?: string | undefined;
  }[];
  required?: boolean;
  sombra?: boolean;
  onChange?: (value) => void;
}

import { LabelComponent } from "./styles";

export function Selecionar({
  titulo,
  textoInterno,
  nome,
  opcoes,
  required,
  sombra,
  onChange,
  mode,
  ...rest
}: PropsSelect) {
  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const options = opcoes ? (
    opcoes?.map((item) => (
      <Option key={item.descricao} value={item.id} label={item.descricao}>
        {item.descricao}
      </Option>
    ))
  ) : (
    <>
      <Option key="Sim" value={true} label={"true"}>
        Sim
      </Option>
      <Option key="Não" value={false} label={"false"}>
        Não
      </Option>
    </>
  );

  return (
    <Form.Item
      name={nome}
      label={
        sombra === false ? titulo : <LabelComponent>{titulo}</LabelComponent>
      }
      rules={[{ required: required, message: "Por favor, insira " + titulo }]}
    >
      <Select
        showSearch
        optionFilterProp="children"
        filterOption={filterOption}
        placeholder={textoInterno}
        onChange={(value) => onChange && onChange(value)}
        style={{
          boxShadow:
            sombra !== false ? "4px 4px 17px rgba(0, 0, 0, 0.15)" : "null",
          borderRadius: "25px",
        }}
        allowClear
        mode={mode}
      >
        {options}
      </Select>
    </Form.Item>
  );
}
