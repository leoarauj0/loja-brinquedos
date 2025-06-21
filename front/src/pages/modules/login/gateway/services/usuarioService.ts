import api from "@/services/api";
import IUsuarioRepository from "../repository/usuarioRepository";
import { IUsuarioRequest } from "../../@types";

const usuarioService: IUsuarioRepository = {
  get: () => api.get(`/v1/usuarios`),
  post: (data: IUsuarioRequest) => api.post(`/v1/usuarios`, data),
};

export default usuarioService;
