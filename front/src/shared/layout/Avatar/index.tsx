/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";

import { Texto } from "@/shared/styles/styles";
import { PoweroffOutlined } from "@ant-design/icons";
import { User } from "@phosphor-icons/react";
import { Avatar, AvatarProps, Popover, Tooltip } from "antd";
import { BotaoPrincipal } from "../botoes/BotaoPrincipal";
import { Container } from "./styles";
import { useAuth } from "@/context/AuthContext";

interface Props extends AvatarProps {
  foto?: any;
  size: number;
}

export function AvatarPhoto({ foto, size, ...rest }: Props) {
  const [popoverRelatorios, setPopoverRelatorios] = useState<boolean>(false);

  const { user, logout } = useAuth();

  const hide = () => {
    setPopoverRelatorios(!popoverRelatorios);
  };

  return (
    <Container>
      <Tooltip placement="bottom" title="Usuário">
        <Popover
          content={
            <>
              <Texto
                style={{
                  color: "#444040",
                  margin: "10px 20px 10px 20px",
                  cursor: "pointer",
                }}
                // onClick={() => mudaModalCiclo()}
              >
                <User
                  size={16}
                  style={{
                    margin: "0 10px -3px 0",
                  }}
                />
                {user?.name}
              </Texto>
              <Texto
                style={{
                  color: "#444040",
                  margin: "10px 20px 10px 20px",
                  cursor: "pointer",
                }}
                // onClick={() => mudaModalCiclo()}
              >
                Email:&nbsp;
                {user?.email}
              </Texto>

              <br />
              <BotaoPrincipal
                style={{
                  // color: "#444040",
                  margin: "10px 20px 10px 20px",
                  // cursor: "pointer",
                }}
                onClick={() => {
                  logout(), sessionStorage.removeItem("buscaForm");
                }}
                icon={
                  <PoweroffOutlined
                    // size={16}
                    style={{
                      margin: "0 0   10px 0",
                    }}
                  />
                }
                texto="Sair"
                danger
                size="small"
              />
            </>
          }
          onOpenChange={hide}
        >
          <Avatar
            style={{
              cursor: "pointer",
            }}
            icon={<User style={{ margin: "7px" }} />}
            src={foto}
            shape="circle"
            size={size}
            {...rest}
          />
        </Popover>
      </Tooltip>
    </Container>
  );
}
