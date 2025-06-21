import decode from "jwt-decode";
import cookies from "nookies";
import { TokenDataType } from "./@types/index";

export const tokenService = {
  set(context: any, access_token: string) {
    cookies.set(context, "loja_token", access_token, {
      path: "/",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60,
    });
  },
  get(context: any) {
    const cookie = cookies.get(context);
    const access_token =
      cookie["loja_token"] !== undefined ? cookie["loja_token"] : undefined;
    return access_token;
  },
  put(context: any, access_token: string) {
    cookies.set(context, "loja_token", access_token, {
      path: "/",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60,
    });
  },
  delete(context: any) {
    cookies.destroy(context, "loja_token", { path: "/" });
  },
  tokenInfo(context) {
    try {
      const access_token = tokenService.get(context);
      const tokenInfo = decode(access_token as any);
      return tokenInfo as TokenDataType;
    } catch (error: any) {}
  },
  isTokenValid(context) {
    const tokenInfo = tokenService.tokenInfo(context);
    if (tokenInfo !== undefined) {
      const expire_in = new Date(tokenInfo!.exp * 1000);

      const now = new Date();
      if (expire_in > now) {
        return true;
      } else {
        return false;
      }
    }
  },
};
