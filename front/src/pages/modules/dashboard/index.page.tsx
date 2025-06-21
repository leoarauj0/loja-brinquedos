import React, { useCallback, useEffect, useState } from "react";

import { Breadcrumb, Divider, Form, Layout, message, Statistic } from "antd";
import { SubTitulo, TopoTelas } from "@/shared/styles/styles";
import { Card } from "@/shared/layout/Card";
import { Linha } from "@/shared/layout/Linha";
import { Coluna } from "@/shared/layout/Coluna";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

import TelasLayoutAuth from "@/shared/components/Layout/index.page";
import { ChartLine, ClipboardText } from "@phosphor-icons/react";
import api from "@/services/api";
import dayjs from "dayjs";

function Dashboard() {
  const [loading, setLoading] = useState(false);

  const [vendasPorDia, setVendasPorDia] = useState<any>({});
  const [melhoresClientes, setMelhoresClientes] = useState<any>({});

  const [mobile, setMobile] = useState<boolean>(false);

  const [form] = Form.useForm();

  useEffect(() => {
    function handleResize() {
      window.innerWidth < 768 ? setMobile(true) : setMobile(false);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [mobile]);

  const buscarVendasPorDia = useCallback(async () => {
    try {
      const res = await api.get(`/relatorios/vendas-por-dia`);
      console.log(res?.data);
      setVendasPorDia(res?.data);
    } catch (error) {
      message.warning("Erro ao carregar dados das vendas!");
    }
  }, []);

  const buscarMelhoresClientes = useCallback(async () => {
    try {
      const res = await api.get(`/relatorios/melhores-clientes`);
      console.log(res?.data);
      setMelhoresClientes(res?.data);
    } catch (error) {
      message.warning("Erro ao carregar dados dos clientes!");
    }
  }, []);

  useEffect(() => {
    buscarVendasPorDia();
    buscarMelhoresClientes();
  }, []);

  const chartData = {
    labels:
      vendasPorDia.length > 0 &&
      vendasPorDia.map((v: any) => dayjs(v.data).format("DD/MM/YYYY")),
    datasets: [
      {
        label: "Vendas",
        data: vendasPorDia.length > 0 && vendasPorDia.map((v: any) => v.total),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Vendas por dia" },
    },
  };

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
                    <ChartLine /> <span>Dashboard</span>
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
              <SubTitulo>Relatório de Vendas</SubTitulo>
            </Divider>

            <Linha>
              <Coluna xs={24} sm={8} md={8}>
                <Card>
                  <Statistic
                    title={
                      <>
                        Cliente com maior volume de vendas:
                        <br />
                        <strong>
                          {melhoresClientes?.maiorVolume?.nome ?? ""}
                        </strong>
                      </>
                    }
                    value={Number(
                      melhoresClientes?.maiorVolume?.total ?? ""
                    ).toFixed(2)}
                    suffix=" R$"
                  />
                </Card>
              </Coluna>
              <Coluna xs={24} sm={8} md={8}>
                <Card>
                  <Statistic
                    title={
                      <>
                        Cliente com maior média de valor por venda:
                        <br />
                        <strong>
                          {melhoresClientes?.maiorMedia?.nome ?? ""}
                        </strong>
                      </>
                    }
                    value={Number(
                      melhoresClientes?.maiorMedia?.media ?? ""
                    ).toFixed(2)}
                    suffix=" R$"
                  />
                </Card>
              </Coluna>
              <Coluna xs={24} sm={8} md={8}>
                <Card>
                  <Statistic
                    title={
                      <>
                        Cliente com maior frequência de compras:
                        <br />
                        <strong>
                          {melhoresClientes?.maiorFrequencia?.nome ?? ""}
                        </strong>
                      </>
                    }
                    value={melhoresClientes?.maiorFrequencia?.dias ?? ""}
                    suffix={
                      melhoresClientes?.maiorFrequencia?.dias === 1
                        ? " Dia"
                        : " Dias"
                    }
                  />
                </Card>
              </Coluna>
            </Linha>

            <Linha>
              <Coluna xs={24} sm={24} md={24}>
                <Card>
                  {/* <SubTitulo>Senhas Preferenciais Atendidas:</SubTitulo> */}
                  <Line options={chartOptions} data={chartData} />
                </Card>
              </Coluna>
            </Linha>
          </Form>
        </Card>
      </Layout>
    </TelasLayoutAuth>
  );
}

export default Dashboard;
