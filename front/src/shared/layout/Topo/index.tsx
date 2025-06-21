import { ArrowLeft } from "@phosphor-icons/react";
import { CardProps, Tooltip } from "antd";
import React, { ReactNode } from "react";
import { BotaoPrincipal } from "../botoes/BotaoPrincipal";

import { Coluna, Container, Linha, Migalhas, Sair } from "./styles";

interface PropsCard extends CardProps {
  children: ReactNode;
}

interface Props {
  texto?: string;
  itens;
  icon?: React.ReactNode;
  relatorios?;
  href?: string;
}

export function Topo({ texto, itens, href, relatorios, ...rest }: Props) {
  // return <Container {...rest}>{children}</Container>;
  return (
    <Container {...rest}>
      <Linha>
        <Coluna>
          <Tooltip title="Voltar">
            <BotaoPrincipal
              shape="circle"
              icon={<ArrowLeft size={"1.2rem"} />}
              href={href}
            />
          </Tooltip>
        </Coluna>
        <Coluna>
          <Migalhas items={itens} />
        </Coluna>
        <Coluna
          style={{
            marginLeft: "auto",
          }}
        >
          <Migalhas items={relatorios} />
        </Coluna>
        {/* <Coluna
          style={{
            marginLeft: "auto",
          }}
        >
          <Tooltip title="Sair">
            <Sair
              icon={<PoweroffOutlined />}
              type="link"
              danger
              // onClick={handleLogout}
            />
          </Tooltip>
           <Tooltip title="Mudar Tema">
            <MudarTema />
          </Tooltip>
        </Coluna> */}
      </Linha>
    </Container>
  );
}
