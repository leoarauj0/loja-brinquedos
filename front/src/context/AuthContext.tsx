"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import cookies from "nookies";
import jwt_decode from "jwt-decode";
import { message } from "antd";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextProps = {
  user: User | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  register: (nome: string, email: string, senha: string) => Promise<void>;
  token: string | null;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setToken(token);
      setUser(JSON.parse(user));
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }, []);

  const login = async (email: string, senha: string) => {
    const res = await api.post("/auth/login", { email, senha });
    const token = res.data.access_token;
    const payload = jwt_decode<{ sub: string; email: string; name: string }>(
      token
    );
    const user = { id: payload.sub, name: payload.name, email: payload.email };

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    cookies.set(null, "loja_token", token, {
      path: "/",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60,
    });

    cookies.set(null, "loja_user", JSON.stringify(user), {
      path: "/",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60,
    });

    setToken(token);
    setUser(user);
    api.defaults.headers.Authorization = `Bearer ${token}`;

    router.push("/modules/dashboard");
  };

  const register = async (nome: string, email: string, senha: string) => {
    const res = await api.post("/auth/register", { nome, email, senha });
    const token = res.data.access_token;
    const payload = jwt_decode<{ sub: string; email: string; name: string }>(
      token
    );
    const user = { id: payload.sub, name: payload.name, email: payload.email };

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    cookies.set(null, "loja_token", token, {
      path: "/",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60,
    });

    cookies.set(null, "loja_user", JSON.stringify(user), {
      path: "/",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60,
    });

    setToken(token);
    setUser(user);
    api.defaults.headers.Authorization = `Bearer ${token}`;

    // router.push("/modules/dashboard");
  };

  const logout = () => {
    localStorage.clear();
    cookies.destroy(null, "loja_token", { path: "/" });
    cookies.destroy(null, "loja_user", { path: "/" });
    setUser(null);
    setToken(null);
    api.defaults.headers.Authorization = "";
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
