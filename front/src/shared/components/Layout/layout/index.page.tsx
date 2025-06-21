import React, { useEffect, useState } from "react";

import Logo from "@/assets/images/logo-loja.png";
import { useAuth } from "@/pages/modules/login/context/AuthContext";
import { useMenuContext } from "@/shared/hooks/menu";
import { AvatarPhoto } from "@/shared/layout/Avatar";
import { TituloTabela } from "@/shared/styles/styles";
import {
  AlignBottom,
  Barcode,
  CallBell,
  ChartLine,
  CurrencyCircleDollar,
  Download,
  ListDashes,
  Monitor,
  Password,
  UserList,
  X,
} from "@phosphor-icons/react";
import type { MenuProps } from "antd";
import { Layout, Menu, Tooltip } from "antd";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Cabecalho, Conteudo, Englobar } from "./styles";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export default function TelasLayout({ children, ...props }) {
  const [collapsed, setCollapsed] = useState(false);

  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();
  const [mobile, setMobile] = useState<boolean>(false);

  const router = useRouter();

  const onClick: MenuProps["onClick"] = (e) => {
    router.push(`${e.key}`);
  };

  useEffect(() => {
    function handleResize() {
      window.innerWidth < 768 ? setMobile(true) : setMobile(false);
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [mobile]);

  const { user, logout } = useAuth();

  const itens = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <ChartLine />,
    },
    {
      key: "produtos",
      label: "Produtos",
      icon: <Barcode />,
    },
    {
      key: "clientes",
      label: "Clientes",
      icon: <UserList />,
    },
    {
      key: "vendas",
      label: "Vendas",
      icon: <CurrencyCircleDollar />,
    },
  ];

  const [styleMenu, setStyleMenu] = useState({
    width: "13rem",
    opacity: 1,
    scale: "scale(1)",
  });

  useEffect(() => {
    collapsed === false
      ? setStyleMenu({ width: "13rem", opacity: 1, scale: "scale(1)" })
      : setStyleMenu({ width: "5rem", opacity: 0, scale: "scale(0)" });
  }, [collapsed]);

  return (
    <Layout>
      <Head>
        <title>Bora Brincar</title>
        <meta name="description" content="" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Cabecalho>
        <Image
          width={mobile ? 180 : 180}
          height={mobile ? 45 : 45}
          src={Logo}
          alt={"Logo"}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <TituloTabela style={{ color: "#fff" }}>{user?.name}</TituloTabela>

          <AvatarPhoto size={35} />
        </div>
      </Cabecalho>

      <Englobar {...props}>
        <Layout
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "row",

            background: `transparent`,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Menu
              onClick={onClick}
              // theme="dark"
              defaultSelectedKeys={["1"]}
              mode="inline"
              items={itens}
              inlineCollapsed={collapsed}
              style={{
                marginTop: "1rem",
                width: `${styleMenu.width}`,
                transition: "width 0.5s",
              }}
            />

            {!collapsed ? (
              <Tooltip title="Fechar Menu">
                <X
                  size={20}
                  onClick={() => setCollapsed(true)}
                  style={{
                    cursor: "pointer",
                    color: "#fff",
                    marginBottom: 25,
                  }}
                />
              </Tooltip>
            ) : (
              <Tooltip title="Abrir Menu">
                <ListDashes
                  size={20}
                  onClick={() => setCollapsed(false)}
                  style={{
                    cursor: "pointer",
                    color: "#fff",
                    marginBottom: 25,
                  }}
                />
              </Tooltip>
            )}
          </div>

          <Conteudo>{children}</Conteudo>
        </Layout>
      </Englobar>
    </Layout>
  );
}
