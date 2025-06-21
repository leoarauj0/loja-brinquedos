export type UserLogin = {
  cpf: string;
  password: string;
};

export interface DataLoginResponse {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  perfil: string;
  token: string;
}

export interface IUsuarioRequest {
  cpf: string;
  nomePessoa: string;
  email: string;
  codUsuarioCriador: number | undefined;
  usuarioExterno: boolean;
  codLotacaoExterna: number;
}
