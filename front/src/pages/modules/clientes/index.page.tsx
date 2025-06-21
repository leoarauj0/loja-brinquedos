import React, { useCallback, useEffect, useState } from "react";

import {
  Breadcrumb,
  Col,
  Divider,
  Form,
  Layout,
  message,
  Modal,
  Popconfirm,
  Row,
  Tooltip,
} from "antd";
import { SubTitulo, TopoTelas } from "@/shared/styles/styles";
import { Card } from "@/shared/layout/Card";
import { Linha } from "@/shared/layout/Linha";
import { Coluna } from "@/shared/layout/Coluna";

import Tabela from "@/shared/layout/Tabela/index.page";

import TelasLayoutAuth from "@/shared/components/Layout/index.page";
import { CheckFat, Pencil, Trash, UserList } from "@phosphor-icons/react";
import api from "@/services/api";
import dayjs from "dayjs";
import theme from "@/shared/theme";
import { BotaoPrincipal } from "@/shared/layout/botoes/BotaoPrincipal";
import { Entrada } from "@/shared/layout/Form/Input";
import { Data } from "@/shared/layout/Form/Date";

function Clientes() {
  const [loading, setLoading] = useState(false);

  const [clientes, setClientes] = useState([]);
  const [clientesFormatado, setClientesFormatado] = useState([]);
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroEmail, setFiltroEmail] = useState("");

  const [modalCadastrarVisible, setModalCadastrarVisible] = useState(false);
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState<any>({});

  const [mobile, setMobile] = useState<boolean>(false);

  const [form] = Form.useForm();
  const [formCriar] = Form.useForm();

  function primeiraLetraAusente(nome: string): string {
    const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    const letrasNoNome = nome
      .normalize("NFD") // Remove acentos
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase()
      .replace(/[^A-Z]/g, ""); // Remove espaços e caracteres não letras

    const letrasSet = new Set(letrasNoNome);

    const letraAusente = alfabeto.find((letra) => !letrasSet.has(letra));

    return letraAusente ?? "-";
  }

  const colunas = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },

    {
      title: "1ª Letra Alfabeto Faltando",
      key: "letra",
      render: (record) => <span>{primeiraLetraAusente(record.nome)}</span>,
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Nascimento",
      key: "nascimento",
      render: (record) => (
        <span>{dayjs(record.nascimento).format("DD/MM/YYYY")}</span>
      ),
    },

    {
      title: "Total de Vendas",
      key: "totalVendas",
      render: (record) => (
        <span>{Number(record.totalVendas).toFixed(2)} R$</span>
      ),
    },

    {
      title: "Opções",
      align: "right",
      dataIndex: "",
      key: "",
      render: (record) => (
        <div style={{ display: "flex" }}>
          <Tooltip
            placement="left"
            title={"Editar Cliente"}
            color={theme.colors.colorPrimary}
          >
            <BotaoPrincipal
              style={{ marginLeft: "auto" }}
              onClick={() => {
                setClienteSelecionado(record);
                form.setFieldsValue({
                  nome: record.nome,
                  email: record.email,
                  data: dayjs(record.nascimento),
                });
                setModalEditarVisible(true);
              }}
              icon={<Pencil size={18} />}
              shape="circle"
            />
          </Tooltip>

          <Tooltip
            placement="right"
            title={"Deletar Cliente"}
            color={theme.colors.colorPrimary}
          >
            <Popconfirm
              placement="topRight"
              title={"Deseja realmente deletar esse cliente?"}
              onConfirm={() => deletarClientes(record.id)}
              okText="Sim"
              cancelText="Não"
            >
              <BotaoPrincipal
                shape="circle"
                danger
                style={{
                  marginLeft: "auto",
                }}
                icon={<Trash size={18} />}
              />
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  useEffect(() => {
    function handleResize() {
      window.innerWidth < 768 ? setMobile(true) : setMobile(false);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [mobile]);

  const carregarClientes = useCallback(async () => {
    setLoading(true);

    const queryParams = new URLSearchParams();
    if (filtroNome) queryParams.append("nome", filtroNome);
    if (filtroEmail) queryParams.append("email", filtroEmail);

    try {
      const res = await api.get(`/clientes?${queryParams.toString()}`);

      const data = await res.data;
      setClientes(data);
    } catch (error) {
      message.warning("Erro ao carregar dados dos clientes!");
    } finally {
      setLoading(false);
    }
  }, []);

  const carregarClientesFormatado = useCallback(async () => {
    setLoading(true);

    const queryParams = new URLSearchParams();
    if (filtroNome) queryParams.append("nome", filtroNome);
    if (filtroEmail) queryParams.append("email", filtroEmail);

    try {
      const res = await api.get(
        `/clientes/formatado?${queryParams.toString()}`
      );

      const clientesRaw = res.data.data.clientes;

      const clientes = clientesRaw.map((cliente) => {
        const id = cliente.info?.id ?? cliente.duplicado?.id ?? "";
        const nome =
          cliente.info?.nomeCompleto ?? cliente.duplicado?.nomeCompleto ?? "";
        const email = cliente.info?.detalhes?.email ?? "";
        const nascimento = cliente.info?.detalhes?.nascimento ?? "";

        const totalVendas = cliente.estatisticas?.vendas?.reduce(
          (acc, venda) => acc + venda.valor,
          0
        );

        return {
          id,
          nome,
          email,
          nascimento,
          totalVendas,
        };
      });

      setClientesFormatado(clientes);
    } catch (error) {
      message.warning("Erro ao carregar dados dos clientes formatados!");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarClientes();
    carregarClientesFormatado();
  }, []);

  const deletarClientes = useCallback(async (id: string) => {
    setLoading(true);

    try {
      await api.delete(`/clientes/${id}`);

      carregarClientes();
      carregarClientesFormatado();
      message.success("Cliente deletado com sucesso!");
    } catch (error) {
      message.warning("Erro ao deletar clientes!");
    } finally {
      setLoading(false);
    }
  }, []);

  const criarCliente = useCallback(async (dadosForm) => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    setLoading(true);

    const data = {
      nome: dadosForm?.nome,
      email: dadosForm?.email,
      nascimento: dayjs(dadosForm?.data).format("YYYY-MM-DDT00:00:00.000Z"),
      userId: user?.id,
    };

    try {
      await api.post(`/clientes`, data);

      carregarClientes();
      carregarClientesFormatado();
      setModalCadastrarVisible(false);
      message.success("Cliente cadastrado com sucesso!");
    } catch (error) {
      message.warning("Erro ao cadastrar clientes!");
    } finally {
      setLoading(false);
    }
  }, []);

  const atualizarCliente = useCallback(
    async (dadosForm) => {
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;

      setLoading(true);

      const data = {
        nome: dadosForm?.nome,
        email: dadosForm?.email,
        nascimento: dayjs(dadosForm?.data).format("YYYY-MM-DDT00:00:00.000Z"),
        userId: user?.id,
      };

      try {
        await api.patch(`/clientes/${clienteSelecionado?.id}`, data);

        message.success("Cliente atualizado com sucesso!");
        setModalEditarVisible(false);
        carregarClientes();
        carregarClientesFormatado();
      } catch (error) {
        message.warning("Erro ao atualizar clientes!");
      } finally {
        setLoading(false);
      }
    },
    [clienteSelecionado?.id]
  );

  return (
    <TelasLayoutAuth>
      <Layout
        style={{
          padding: mobile ? "0.8rem" : "1.2rem",
          background: `transparent`,
        }}
      >
        <TopoTelas>
          <Breadcrumb
            items={[
              {
                title: (
                  <>
                    <UserList /> <span>Clientes</span>
                  </>
                ),
              },
            ]}
          />
        </TopoTelas>
        <Card>
          <Form
            layout="vertical"
            form={form}
            // onFinishFailed={}
          >
            <Divider orientation="left">
              <SubTitulo>Lista de Clientes</SubTitulo>
            </Divider>
            <BotaoPrincipal
              texto="Novo Cliente"
              type="primary"
              onClick={() => setModalCadastrarVisible(true)}
              style={{ marginBottom: 7, marginLeft: "auto", marginTop: -17 }}
            />

            <Linha>
              <Coluna xs={24} sm={24} md={24}>
                <Card>
                  <Tabela
                    emptyTexto={"Sem Dados"}
                    columns={colunas}
                    dataSource={clientesFormatado}
                  />
                </Card>
              </Coluna>
            </Linha>
          </Form>
        </Card>
      </Layout>

      <Modal
        title=""
        open={modalEditarVisible}
        // onOk={handleOk}
        onCancel={() => setModalEditarVisible(false)}
        width={1200}
        footer={[]}
      >
        <Form layout="vertical" form={form} onFinish={atualizarCliente}>
          <Row gutter={24}>
            <Col span={8}>
              <Entrada
                textoInterno={"Digite o nome "}
                titulo={"Nome:"}
                nome={"nome"}
                rules={[
                  { required: true, message: "Por favor, insira o nome" },
                ]}
              />
            </Col>

            <Col span={8}>
              <Entrada
                textoInterno={"Digite o email"}
                titulo={"Email:"}
                nome={"email"}
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Por favor, insira um email válido!",
                  },
                ]}
              />
            </Col>

            <Col span={8}>
              <Data
                textoInterno={dayjs(new Date()).format("DD/MM/YYYY")}
                titulo={"Data de Nascimento:"}
                nome={"data"}
                required={true}
                defaultValue={dayjs(new Date()).format("YYYY-MM-DD")}
              />
            </Col>
          </Row>
          <BotaoPrincipal
            texto="Salvar"
            icon={<CheckFat size={18} />}
            type="primary"
            htmlType="submit"
            style={{ marginTop: 20, marginLeft: "auto" }}
          />
        </Form>
      </Modal>

      <Modal
        title=""
        open={modalCadastrarVisible}
        // onOk={handleOk}
        onCancel={() => setModalCadastrarVisible(false)}
        width={1200}
        footer={[]}
      >
        <Form layout="vertical" form={formCriar} onFinish={criarCliente}>
          <Row gutter={24}>
            <Col span={8}>
              <Entrada
                textoInterno={"Digite o nome "}
                titulo={"Nome:"}
                nome={"nome"}
                rules={[
                  { required: true, message: "Por favor, insira o nome" },
                ]}
              />
            </Col>

            <Col span={8}>
              <Entrada
                textoInterno={"Digite o email"}
                titulo={"Email:"}
                nome={"email"}
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Por favor, insira um email válido!",
                  },
                ]}
              />
            </Col>

            <Col span={8}>
              <Data
                textoInterno={dayjs(new Date()).format("DD/MM/YYYY")}
                titulo={"Data de Nascimento:"}
                nome={"data"}
                required={true}
                defaultValue={dayjs(new Date()).format("YYYY-MM-DD")}
              />
            </Col>
          </Row>
          <BotaoPrincipal
            texto="Salvar"
            icon={<CheckFat size={18} />}
            type="primary"
            htmlType="submit"
            style={{ marginTop: 20, marginLeft: "auto" }}
          />
        </Form>
      </Modal>
    </TelasLayoutAuth>
  );
}

export default Clientes;
