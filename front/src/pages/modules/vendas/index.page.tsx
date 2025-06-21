import React, { useCallback, useEffect, useState } from "react";

import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  Layout,
  message,
  Modal,
  Popconfirm,
  Row,
  Tag,
  Tooltip,
} from "antd";
import { SubTitulo, Texto, Titulo, TopoTelas } from "@/shared/styles/styles";
import { Card } from "@/shared/layout/Card";
import { Linha } from "@/shared/layout/Linha";
import { Coluna } from "@/shared/layout/Coluna";

import Tabela from "@/shared/layout/Tabela/index.page";

import TelasLayoutAuth from "@/shared/components/Layout/index.page";
import {
  Barcode,
  Check,
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
import { Selecionar } from "@/shared/layout/Form/Select";

function Vendas() {
  const [loading, setLoading] = useState(false);

  const [vendas, setVendas] = useState([]);

  const [filtroNome, setFiltroNome] = useState("");

  const [modalCadastrarVisible, setModalCadastrarVisible] = useState(false);
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [vendaSelecionada, setVendaSelecionada] = useState<any>({});

  const [mobile, setMobile] = useState<boolean>(false);

  const [clientes, setClientes] = useState<any[]>([]);
  const [produtos, setProdutos] = useState<any[]>([]);
  const [clienteSelecionado, setClienteSelecionado] = useState<string>("");
  const [produtoSelecionado, setProdutoSelecionado] = useState<string>("");
  const [quantidade, setQuantidade] = useState<number>(1);
  const [itens, setItens] = useState<any[]>([]);

  const [form] = Form.useForm();
  const [formCriar] = Form.useForm();

  const colunas = [
    {
      title: "Cliente",

      key: "cliente",
      render: (record) => <span>{record.cliente.nome}</span>,
    },
    {
      title: "Status",
      // dataIndex: "status",
      key: "status",
      render: (record) => (
        <>
          {record.status === "PENDENTE" ? (
            <Tag color="orange">Pendente</Tag>
          ) : record.status === "VENDIDO" ? (
            <Tag color="green">Vendido</Tag>
          ) : record.status === "CANCELADO" ? (
            <Tag color="red">Cancelado</Tag>
          ) : (
            <Tag color="blue">Entregue</Tag>
          )}
        </>
      ),
    },

    {
      title: "Total",
      key: "total",
      render: (record) => <span>{Number(record.total).toFixed(2)} R$</span>,
    },

    {
      title: "Opções",
      key: "vender",
      render: (record) =>
        record.status === "PENDENTE" && (
          <Flex gap={5}>
            <Popconfirm
              placement="topRight"
              title={"Confirmar essa venda?"}
              onConfirm={() => atualizarVenda(record.id)}
              okText="Sim"
              cancelText="Não"
            >
              <Tooltip
                placement="left"
                title={"Vender"}
                color={theme.colors.colorPrimary}
              >
                <BotaoPrincipal
                  shape="circle"
                  icon={<Check size={18} />}
                  style={{ background: theme.colors.successGradiente }}
                />
              </Tooltip>
            </Popconfirm>
            <Popconfirm
              placement="topRight"
              title={"Excluir essa venda?"}
              onConfirm={() => deletarVenda(record.id)}
              okText="Sim"
              cancelText="Não"
            >
              <Tooltip
                placement="right"
                title={"Excluir"}
                color={theme.colors.colorPrimary}
              >
                <BotaoPrincipal
                  shape="circle"
                  icon={<Trash size={18} />}
                  style={{ background: theme.colors.dangerGradiente }}
                />
              </Tooltip>
            </Popconfirm>
          </Flex>
        ),
    },
  ];

  const colunasItens = [
    {
      title: "Venda",

      key: "venda",
      render: (record) => <span>{record?.produto?.nome}</span>,
    },

    {
      title: "Valor",
      key: "valor",
      render: (record) => <span>{record?.produto?.preco} R$</span>,
    },

    {
      title: "Quantidade",
      key: "quantidade",
      render: (record) => <span>{record?.quantidade}</span>,
    },
  ];

  const colunasVendas = [
    {
      title: "Venda",

      key: "venda",
      render: (record) => <span>{record?.nome}</span>,
    },

    {
      title: "Valor",
      key: "valor",
      render: (record) => (
        <span>
          {record.quantidade} x R$ {record.preco.toFixed(2)}
        </span>
      ),
    },

    {
      title: "Total",
      key: "total",
      render: (record) => (
        <span>R$ {(record.preco * record.quantidade).toFixed(2)}</span>
      ),
    },

    {
      title: "Opções",
      align: "right",
      dataIndex: "",
      key: "",
      render: (record) => (
        <div style={{ display: "flex" }}>
          {/* <Tooltip
            placement="left"
            title={"Editar Venda"}
            color={theme.colors.colorPrimary}
          >
            <BotaoPrincipal
              style={{ marginLeft: "auto" }}
              onClick={() => {
                setVendaSelecionado(record);
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
          </Tooltip> */}

          <Tooltip
            placement="right"
            title={"Deletar Venda"}
            color={theme.colors.colorPrimary}
          >
            <Popconfirm
              placement="topRight"
              title={"Deseja realmente deletar essa venda?"}
              onConfirm={() => removerItem(record.id)}
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

  const listarVendas = useCallback(async () => {
    setLoading(true);

    const queryParams = new URLSearchParams();
    if (filtroNome) queryParams.append("nome", filtroNome);

    try {
      const res = await api.get(`/vendas?${queryParams.toString()}`);

      const data = await res.data;
      setVendas(data);
    } catch (error) {
      message.warning("Erro ao carregar dados dos vendas!");
    } finally {
      setLoading(false);
    }
  }, []);

  const carregarClientes = useCallback(async () => {
    setLoading(true);

    try {
      const res = await api.get(`/clientes?`);

      const data = await res.data;
      setClientes(data);
    } catch (error) {
      message.warning("Erro ao carregar dados dos clientes!");
    } finally {
      setLoading(false);
    }
  }, []);

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
    listarVendas();
  }, []);

  const deletarVenda = useCallback(async (id: string) => {
    setLoading(true);

    try {
      await api.delete(`/vendas/${id}`);

      listarVendas();
      message.warning("Venda deletada com sucesso!");
    } catch (error) {
      message.warning("Erro ao deletar venda!");
    } finally {
      setLoading(false);
    }
  }, []);

  const criarVenda = useCallback(async () => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    setLoading(true);

    const data = {
      clienteId: clienteSelecionado,
      produtos: itens.map((i) => ({
        produtoId: i.id,
        quantidade: i.quantidade,
      })),
    };

    try {
      await api.post(`/vendas`, data);

      listarVendas();
      setModalCadastrarVisible(false);
      message.warning("Venda cadastrado com sucesso!");
    } catch (error) {
      message.warning("Erro ao cadastrar venda!");
    } finally {
      setLoading(false);
    }
  }, [clienteSelecionado, itens, listarVendas]);

  const atualizarVenda = useCallback(
    async (id) => {
      setLoading(true);

      const data = {
        status: "VENDIDO",
      };

      try {
        await api.patch(`/vendas/${id}/status`, data);

        listarVendas();
        message.warning("Vendido com sucesso!");
        setModalEditarVisible(false);
      } catch (error) {
        message.warning("Erro ao vender!");
      } finally {
        setLoading(false);
      }
    },
    [vendaSelecionada?.id]
  );

  const adicionarItem = () => {
    if (!produtoSelecionado) return;

    const produto = produtos.find((p) => p.id === produtoSelecionado);
    if (!produto) return;

    const itemExistente = itens.find((i) => i.id === produto.id);
    if (itemExistente) {
      setItens((prev) =>
        prev.map((i) =>
          i.id === produto.id
            ? { ...i, quantidade: i.quantidade + quantidade }
            : i
        )
      );
    } else {
      setItens((prev) => [
        ...prev,
        {
          id: produto.id,
          nome: produto.nome,
          preco: produto.preco,
          quantidade,
        },
      ]);
    }

    setProdutoSelecionado("");
    setQuantidade(1);
  };

  const removerItem = (id: string) => {
    setItens((prev) => prev.filter((i) => i.id !== id));
  };

  const total = itens.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
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
                    <Barcode /> <span>Vendas</span>
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
              <SubTitulo>Lista de Vendas</SubTitulo>
            </Divider>
            <BotaoPrincipal
              texto="Nova Venda"
              type="primary"
              onClick={() => {
                setModalCadastrarVisible(true),
                  carregarClientes(),
                  listarProdutos();
              }}
              style={{ marginBottom: 7, marginLeft: "auto", marginTop: -17 }}
            />

            <Linha>
              <Coluna xs={24} sm={24} md={24}>
                <Card>
                  <Tabela
                    emptyTexto={"Sem Dados"}
                    columns={colunas}
                    dataSource={vendas}
                    rowKey={(record, item: any) => item}
                    expandable={{
                      expandedRowRender: (record) => (
                        <div>
                          <Tabela
                            emptyTexto={"Sem Dados"}
                            columns={colunasItens}
                            dataSource={record.produtos}
                            rowKey={(record, item: any) => item}
                          />
                        </div>
                      ),
                    }}
                  />
                </Card>
              </Coluna>
            </Linha>
          </Form>
        </Card>
      </Layout>

      <Modal
        title=""
        open={modalCadastrarVisible}
        // onOk={handleOk}
        onCancel={() => setModalCadastrarVisible(false)}
        width={1200}
        footer={[]}
      >
        {/* <Form layout="vertical" form={formCriar} onFinish={criarVenda}>
          <Row gutter={24}>
            <Col span={12}>
              <Selecionar
                textoInterno={"Selecione o cliente"}
                titulo={"Cliente:"}
                nome={"clienteId"}
                required={true}
                opcoes={clientes.map((item: { id: string; nome: string }) => ({
                  id: item.id,
                  descricao: item.nome,
                }))}
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
        </Form> */}

        <Form layout="vertical" form={formCriar} onFinish={criarVenda}>
          <h2 style={{ marginBottom: 10 }}>Nova Venda</h2>

          {/* Seleção de Cliente */}

          <Selecionar
            textoInterno={"Selecione o cliente"}
            value={clienteSelecionado}
            onChange={setClienteSelecionado}
            titulo={"Cliente"}
            nome={"clienteId"}
            required={true}
            opcoes={clientes.map((item: { id: string; nome: string }) => ({
              id: item.id,
              descricao: item.nome,
            }))}
          />

          {/* Adicionar Produto */}
          <Row gutter={24}>
            <Col span={18}>
              <Selecionar
                textoInterno={"Selecione o cliente"}
                value={produtoSelecionado}
                onChange={setProdutoSelecionado}
                titulo={"Produto"}
                nome={"produtoId"}
                required={true}
                opcoes={produtos.map((item: { id: string; nome: string }) => ({
                  id: item.id,
                  descricao: item.nome,
                }))}
              />
            </Col>

            <Col span={6}>
              <Entrada
                textoInterno={"Digite a quantidade"}
                titulo={"Quantidade:"}
                value={quantidade}
                nome={"quantidade"}
                type="number"
                onChange={(e) => setQuantidade(parseInt(e.target.value))}
                rules={[
                  { required: true, message: "Por favor, insira a quantidade" },
                ]}
              />
            </Col>
          </Row>
          <BotaoPrincipal
            style={{ marginTop: 2, marginLeft: "auto" }}
            texto="Adicionar"
            onClick={adicionarItem}
          />

          {/* Itens adicionados */}
          <br />
          <Card>
            <Tabela
              emptyTexto={"Sem itens para Venda"}
              columns={colunasVendas}
              dataSource={itens}
              rowKey={(record, item: any) => item}
            />
          </Card>

          <br />
          {/* Total */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Titulo style={{ marginRight: 25 }}>
              Total: {total.toFixed(2)}
            </Titulo>
          </div>
          <br />
          {/* Ações */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <Button onClick={() => setModalCadastrarVisible(false)}>
              Cancelar
            </Button>

            <BotaoPrincipal
              texto="Confirmar Venda"
              onClick={() => criarVenda()}
              disabled={!clienteSelecionado || itens.length === 0}
            />
          </div>
        </Form>
      </Modal>
    </TelasLayoutAuth>
  );
}

export default Vendas;
