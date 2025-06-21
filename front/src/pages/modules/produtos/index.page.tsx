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
import {
  Barcode,
  CheckFat,
  Pencil,
  Trash,
  UserList,
} from "@phosphor-icons/react";
import api from "@/services/api";
import dayjs from "dayjs";
import theme from "@/shared/theme";
import { BotaoPrincipal } from "@/shared/layout/botoes/BotaoPrincipal";
import { Entrada } from "@/shared/layout/Form/Input";
import { Data } from "@/shared/layout/Form/Date";

function Produtos() {
  const [loading, setLoading] = useState(false);

  const [produtos, setProdutos] = useState([]);
  const [filtroNome, setFiltroNome] = useState("");

  const [modalCadastrarVisible, setModalCadastrarVisible] = useState(false);
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<any>({});

  const [mobile, setMobile] = useState<boolean>(false);

  const [form] = Form.useForm();
  const [formCriar] = Form.useForm();

  const colunas = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "Descrição",
      dataIndex: "descricao",
      key: "descricao",
    },

    {
      title: "Quantidade",
      dataIndex: "quantidade",
      key: "quantidade",
    },

    {
      title: "Preço",
      key: "preco",
      render: (record) => <span>{record.preco} R$</span>,
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
            title={"Editar Produto"}
            color={theme.colors.colorPrimary}
          >
            <BotaoPrincipal
              style={{ marginLeft: "auto" }}
              onClick={() => {
                setProdutoSelecionado(record);
                form.setFieldsValue({
                  nome: record.nome,
                  descricao: record.descricao,
                  preco: record.preco,
                  quantidade: record.quantidade,
                });
                setModalEditarVisible(true);
              }}
              icon={<Pencil size={18} />}
              shape="circle"
            />
          </Tooltip>

          <Tooltip
            placement="right"
            title={"Deletar Produto"}
            color={theme.colors.colorPrimary}
          >
            <Popconfirm
              placement="topRight"
              title={"Deseja realmente deletar esse produto?"}
              onConfirm={() => deletarProduto(record.id)}
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

  const listarProdutos = useCallback(async () => {
    setLoading(true);

    const queryParams = new URLSearchParams();
    if (filtroNome) queryParams.append("nome", filtroNome);

    try {
      const res = await api.get(`/produtos?${queryParams.toString()}`);

      const data = await res.data;
      setProdutos(data);
    } catch (error) {
      message.warning("Erro ao carregar dados dos produtos!");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    listarProdutos();
  }, []);

  const deletarProduto = useCallback(async (id: string) => {
    setLoading(true);

    try {
      await api.delete(`/produtos/${id}`);

      listarProdutos();
      message.warning("Produto deletado com sucesso!");
    } catch (error) {
      message.warning("Erro ao deletar produto!");
    } finally {
      setLoading(false);
    }
  }, []);

  const criarProduto = useCallback(async (dadosForm) => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    setLoading(true);

    const data = {
      nome: dadosForm?.nome,
      descricao: dadosForm?.descricao,
      preco: Number(dadosForm?.preco),
      quantidade: Number(dadosForm?.quantidade),
      userId: user?.id,
    };

    try {
      await api.post(`/produtos`, data);

      listarProdutos();
      setModalCadastrarVisible(false);
      message.warning("Produto cadastrado com sucesso!");
    } catch (error) {
      message.warning("Erro ao cadastrar produto!");
    } finally {
      setLoading(false);
    }
  }, []);

  const atualizarProduto = useCallback(
    async (dadosForm) => {
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;

      setLoading(true);

      const data = {
        nome: dadosForm?.nome,
        descricao: dadosForm?.descricao,
        preco: Number(dadosForm?.preco),
        quantidade: Number(dadosForm?.quantidade),
        userId: user?.id,
      };

      try {
        await api.patch(`/produtos/${produtoSelecionado?.id}`, data);

        listarProdutos();
        message.warning("Produto atualizado com sucesso!");
        setModalEditarVisible(false);
      } catch (error) {
        message.warning("Erro ao atualizar produto!");
      } finally {
        setLoading(false);
      }
    },
    [produtoSelecionado?.id]
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
                    <Barcode /> <span>Produtos</span>
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
              <SubTitulo>Lista de Produtos</SubTitulo>
            </Divider>
            <BotaoPrincipal
              texto="Novo Produto"
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
                    dataSource={produtos}
                  />
                </Card>
              </Coluna>
            </Linha>
          </Form>
        </Card>
      </Layout>

      <Modal
        title="Editar Produto"
        open={modalEditarVisible}
        // onOk={handleOk}
        onCancel={() => setModalEditarVisible(false)}
        width={1200}
        footer={[]}
      >
        <Form layout="vertical" form={form} onFinish={atualizarProduto}>
          <Row gutter={24}>
            <Col span={12}>
              <Entrada
                textoInterno={"Digite o nome "}
                titulo={"Nome:"}
                nome={"nome"}
                rules={[
                  { required: true, message: "Por favor, insira o nome" },
                ]}
              />
            </Col>

            <Col span={12}>
              <Entrada
                textoInterno={"Digite a descrição"}
                titulo={"Descrição:"}
                nome={"descricao"}
                rules={[
                  { required: true, message: "Por favor, insira a descrição" },
                ]}
              />
            </Col>

            <Col span={12}>
              <Entrada
                textoInterno={"Digite o preço"}
                titulo={"Preço:"}
                nome={"preco"}
                rules={[
                  { required: true, message: "Por favor, insira o preço" },
                ]}
                type="number"
              />
            </Col>

            <Col span={12}>
              <Entrada
                textoInterno={"Digite a quantidade"}
                titulo={"Quantidade:"}
                nome={"quantidade"}
                rules={[
                  { required: true, message: "Por favor, insira a quantidade" },
                ]}
                type="number"
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
        title="Cadastrar Produto"
        open={modalCadastrarVisible}
        // onOk={handleOk}
        onCancel={() => setModalCadastrarVisible(false)}
        width={1200}
        footer={[]}
      >
        <Form layout="vertical" form={formCriar} onFinish={criarProduto}>
          <Row gutter={24}>
            <Col span={12}>
              <Entrada
                textoInterno={"Digite o nome "}
                titulo={"Nome:"}
                nome={"nome"}
                rules={[
                  { required: true, message: "Por favor, insira o nome" },
                ]}
              />
            </Col>

            <Col span={12}>
              <Entrada
                textoInterno={"Digite a descrição"}
                titulo={"Descrição:"}
                nome={"descricao"}
                rules={[
                  { required: true, message: "Por favor, insira a descrição" },
                ]}
              />
            </Col>

            <Col span={12}>
              <Entrada
                textoInterno={"Digite o preço"}
                titulo={"Preço:"}
                nome={"preco"}
                rules={[
                  { required: true, message: "Por favor, insira o preço" },
                ]}
                type="number"
              />
            </Col>

            <Col span={12}>
              <Entrada
                textoInterno={"Digite a quantidade"}
                titulo={"Quantidade:"}
                nome={"quantidade"}
                rules={[
                  { required: true, message: "Por favor, insira a quantidade" },
                ]}
                type="number"
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

export default Produtos;
