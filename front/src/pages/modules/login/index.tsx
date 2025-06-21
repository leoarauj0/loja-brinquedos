import Image from "next/image";
import React, { useEffect, useState } from "react";
import Background from "@/assets/images/fundo.png";

import LogoLoja from "@/assets/images/logo-loja.png";

import { Cards, SubTitulo } from "./styles";
import { Form, message, Tabs } from "antd";
import { BotaoPrincipal } from "@/shared/layout/botoes/BotaoPrincipal";

import { Entrada } from "@/shared/layout/Form/Input";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { Senha } from "@/shared/layout/Form/Senha";

interface ILoginData {
  email: string;
  senha: string;
}

interface IRegisterData {
  nome: string;
  email: string;
  senha: string;
}

function Login() {
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();
  const [mobile, setMobile] = useState<boolean>(false);

  const [form] = Form.useForm();
  const [formCadastro] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const { login, register } = useAuth();

  useEffect(() => {
    function handleResize() {
      window.innerWidth < 1000 ? setMobile(true) : setMobile(false);
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [mobile]);

  async function handleLogin(loginData: ILoginData) {
    setLoading(true);

    try {
      await login(loginData.email, loginData.senha);
    } catch (error: any) {
      if (error) {
        message.error(error?.response?.data?.message);
      } else {
        message.error(
          "Falha ao efetuar login! Verifique seus dados e tente novamente!"
        );
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleCadastro(loginData: IRegisterData) {
    setLoading(true);

    try {
      await register(loginData.nome, loginData.email, loginData.senha);
      formCadastro.resetFields();
    } catch (error: any) {
      if (error) {
        message.error(error?.response?.data?.message);
      } else {
        message.error(
          "Falha ao efetuar login! Verifique seus dados e tente novamente!"
        );
      }
    } finally {
      setLoading(false);
    }
  }

  if (width && height) {
    return (
      <div
        style={{
          // margin: "-8px",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "100vh",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Image
            width={width}
            height={height}
            style={{
              zIndex: -999,
              position: "absolute",

              backgroundSize: "cover",
            }}
            src={Background}
            alt={"Background"}
          />
          <Image
            width={200}
            style={{ padding: "10px" }}
            //height={400}
            // style={{ borderRadius: "15px" }}
            src={LogoLoja}
            alt={"LogoGoverno"}
          />
          <Cards
            style={{
              width: mobile ? width / 1.15 : width / 3,
              // height: height / 1.5,
            }}
          >
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab={<SubTitulo>Login</SubTitulo>} key="1">
                <Form
                  layout="vertical"
                  form={form}
                  name="login"
                  initialValues={{ remember: true }}
                  onFinish={handleLogin}
                  // onFinish={handleFazLogin}
                >
                  <Entrada
                    // type="email"
                    required={true}
                    textoInterno={"Digite seu email"}
                    titulo={"Email"}
                    nome={"email"}
                    rules={[
                      {
                        required: true,
                        message: "Por favor, digite seu email",
                      },
                    ]}
                  />

                  <Senha
                    type="senha"
                    textoInterno={"Digite sua senha"}
                    titulo={"Senha"}
                    nome={"senha"}
                    rules={[
                      {
                        required: true,
                        message: "Por favor, digite sua senha",
                      },
                    ]}
                  />

                  <BotaoPrincipal
                    texto="Entrar"
                    htmlType="submit"
                    type="primary"
                    style={{ width: "100%" }}
                    loading={loading}
                  />
                </Form>
              </Tabs.TabPane>

              <Tabs.TabPane tab={<SubTitulo>Cadastro</SubTitulo>} key="2">
                <Form
                  layout="vertical"
                  form={formCadastro}
                  name="login"
                  initialValues={{ remember: true }}
                  onFinish={handleCadastro}
                >
                  <Entrada
                    required={true}
                    textoInterno={"Digite seu nome"}
                    titulo={"Nome"}
                    nome={"nome"}
                    rules={[
                      {
                        required: true,
                        message: "Por favor, digite seu nome",
                      },
                    ]}
                  />

                  <Entrada
                    // type="email"
                    required={true}
                    textoInterno={"Digite seu email"}
                    titulo={"Email"}
                    nome={"email"}
                    rules={[
                      {
                        required: true,
                        message: "Por favor, digite seu email",
                      },
                    ]}
                  />

                  <Senha
                    type="senha"
                    textoInterno={"Digite sua senha"}
                    titulo={"Senha"}
                    nome={"senha"}
                    rules={[
                      {
                        required: true,
                        message: "Por favor, digite sua senha",
                      },
                    ]}
                  />

                  <BotaoPrincipal
                    texto="Cadastrar"
                    htmlType="submit"
                    type="primary"
                    style={{ width: "100%" }}
                    loading={loading}
                  />
                </Form>
              </Tabs.TabPane>
            </Tabs>
          </Cards>
        </div>
      </div>
    );
  }
  return null;
}

export default Login;
