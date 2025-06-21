# 🚀 Loja de Brinquedos - Projeto Fullstack

Este é um projeto fullstack desenvolvido como teste técnico. Ele consiste em uma API (**backend**) feita com **NestJS, Prisma e PostgreSQL**, e um frontend em **Next.js, React, TypeScript, Ant Design e Styled Components**.

O sistema permite gerenciar clientes, produtos, vendas e consultar estatísticas da loja.

---

## 🏗️ Tecnologias Utilizadas

### 🔧 Backend:

- NestJS — Framework Node.js
- Prisma ORM — ORM para banco de dados
- PostgreSQL — Banco de dados relacional
- JWT — Autenticação
- Bcrypt — Hash de senhas
- Jest — Testes automatizados

### 🎨 Frontend:

- Next.js — Framework React
- TypeScript — Tipagem estática
- Ant Design — Biblioteca de componentes UI
- Styled Components — CSS-in-JS
- Chart.js — Gráficos
- React Hook...

---

## 🚚 Funcionalidades

### 🔐 Autenticação:

- Registro e login de usuários
- Proteção de rotas via JWT

### 👥 Clientes:

- Cadastro, listagem, edição e exclusão
- Filtros por nome e email
- Normalização de dados aninhados e redundantes (conforme especificação do desafio)

### 📦 Produtos:

- CRUD completo de produtos (nome, descrição, preço e quantidade)

### 🛒 Vendas:

- Criação de vendas selecionando cliente, produtos e quantidade
- Cálculo automático do total
- Listagem e remoção de vendas

### 📊 Dashboard & Relatórios:

- Gráfico de vendas por dia
- Estatísticas dos melhores clientes:
  - 🔸 Maior volume de vendas
  - 🔸 Maior média de valor por venda
  - 🔸 Maior frequência de compra (dias únicos com vendas)
- Cálculo da **primeira letra ausente** no nome do cliente (A-Z)

---

## 🗺️ Estrutura de Pastas

### Backend (`/backend`):

/src
/auth # Autenticação
/clientes # CRUD de clientes
/produtos # CRUD de produtos
/vendas # CRUD de vendas
/relatorios # Relatórios e estatísticas
/prisma # Prisma ORM
app.module.ts # Módulo principal

### Frontend (`/frontend`):

/app
/login # Tela de login
/dashboard # Painel de estatísticas
/clientes # CRUD de clientes
/produtos # CRUD de produtos
/vendas # Controle de vendas
/components # Componentes reutilizáveis (UI, layouts, etc.)
/lib # Helpers e funções utilitárias

---

## 🧠 Como Executar o Projeto Localmente

### 🔸 Pré-requisitos:

- Node.js (v18+)
- Yarn ou NPM
- Docker (para o banco de dados)

### 🔥 Subindo o banco com Docker:

```bash
cd backend
docker-compose up -d
```

### 🚀 Backend:

```bash
cd backend
yarn
npx prisma migrate dev
yarn start:dev
```

A API estará rodando em: http://localhost:3333

### 🌐 Frontend:

```bash
cd frontend
yarn
yarn dev
```

O frontend estará rodando em: http://localhost:3000

---

## 🔐 Variáveis de Ambiente

### Backend (`.env`):

DATABASE_URL="postgresql://admin:admin@localhost:5432/loja_teste?schema=public"
JWT_SECRET="sua_chave_secreta"

---

## 🧪 Testes Automatizados

No backend:

```bash
yarn test:e2e
```

Testes End-to-End para autenticação, CRUD de clientes, produtos, vendas e relatórios.

---

## 📑 Documentação das Rotas

| Método | Rota                         | Descrição                     |
| ------ | ---------------------------- | ----------------------------- |
| POST   | `/auth/register`             | Registro de usuário           |
| POST   | `/auth/login`                | Login                         |
| GET    | `/clientes`                  | Listar clientes (com filtros) |
| POST   | `/clientes`                  | Criar cliente                 |
| PATCH  | `/clientes/:id`              | Atualizar cliente             |
| DELETE | `/clientes/:id`              | Deletar cliente               |
| GET    | `/produtos`                  | Listar produtos               |
| POST   | `/produtos`                  | Criar produto                 |
| PATCH  | `/produtos/:id`              | Atualizar produto             |
| DELETE | `/produtos/:id`              | Deletar produto               |
| GET    | `/vendas`                    | Listar vendas                 |
| POST   | `/vendas`                    | Criar venda                   |
| DELETE | `/vendas/:id`                | Deletar venda                 |
| GET    | `/relatorios/vendas-por-dia` | Gráfico de vendas por dia     |
| GET    | `/relatorios/clientes-top`   | Melhores clientes             |

---

## 🎯 Funcionalidades Específicas do Desafio

- ✅ Tratamento de dados aninhados e redundantes no frontend.
- ✅ Cálculo da primeira letra do alfabeto ausente no nome dos clientes (ou "-" se nenhuma faltar).
- ✅ Gráfico de vendas por dia.
- ✅ Destaque dos melhores clientes:
  - Maior volume de vendas
  - Maior média de venda
  - Maior frequência de compra

---

## 🤝 Contato

Desenvolvido por **Léo Araújo**.
