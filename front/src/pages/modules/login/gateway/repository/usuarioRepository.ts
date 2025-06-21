import { AxiosPromise } from "axios";
import { IUsuarioRequest } from "../../@types";

export default interface IUsuarioRepository {
  get: () => AxiosPromise;
  post: (data: IUsuarioRequest) => AxiosPromise;
}
