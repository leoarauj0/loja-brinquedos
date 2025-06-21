import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
import { Button, Result } from "antd";
// import { tokenService } from "../../services/token";
import { useRouter } from "next/router";

const AccessDenied = () => {
  const router = useRouter();
  // const { setAuthContextData } = useContext(AuthContext);

  // const handleLogout = () => {
  //   setAuthContextData({
  //     authenticated: false,
  //     tokenInfo: undefined,
  //     userInfo: undefined,
  //   });
  //   tokenService.delete();
  //   router.push("/login");
  // };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Result
        status="403"
        title="Acesso Negado!"
        subTitle="Desculpe, você não tem autorização para acessar este sistema."
        extra={<Button type="primary">Voltar</Button>}
      />
    </div>
  );
};

export default AccessDenied;
