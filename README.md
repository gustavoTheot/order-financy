# 💚 Financy — Gestão de Finanças Pessoais

O **Financy** é uma aplicação web fullstack moderna para gerenciamento de finanças pessoais. O projeto permite que usuários gerenciem suas transações financeiras (entradas e saídas) e categorias customizadas com total isolamento de dados, autenticação segura e uma interface rica e responsiva.

Desenvolvido como projeto prático da **Pós-Graduação**.

---

## 🎯 O que o projeto faz?

- 🔐 **Autenticação & Segurança**: Cadastro de conta e Login de usuários com criptografia de senha (`bcryptjs`) e tokens de acesso JWT.
- 📊 **Dashboard Financeiro**: Exibe o resumo visual de transações recentes, balanço e gráfico/resumo por categorias.
- 💳 **Gerenciamento de Transações (CRUD)**:
  - Criação de novas transações (Receita ou Despesa) vinculadas a categorias.
  - Edição de transações existentes.
  - Exclusão lógica de transações.
  - Listagem paginada com suporte a busca por descrição e filtros por tipo ou categoria.
- 🏷️ **Gerenciamento de Categorias (CRUD)**:
  - Criação de categorias personalizadas com escolha de ícones e cores HSL.
  - Edição de títulos, ícones e paletas de cores.
  - Exclusão segura de categorias.
  - Contagem automática de transações associadas a cada categoria.
- 👤 **Gerenciamento de Perfil**: Edição das informações do usuário e encerramento de sessão (Logout).

---

## 🛠️ Stacks Utilizadas

### **Back-end**
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **API Runtime**: Node.js
- **API Framework / GraphQL**: [GraphQL](https://graphql.org/), [Type-GraphQL](https://typegraphql.com/) & [Apollo Server 4](https://www.apollographql.com/docs/apollo-server/)
- **ORM & Banco de Dados**: [Prisma ORM](https://www.prisma.io/) & [SQLite](https://www.sqlite.org/)
- **Autenticação**: JSON Web Token (`jsonwebtoken`) & Hash de Senhas (`bcryptjs`)
- **HTTP Server**: Express.js com Middleware CORS habilitado

### **Front-end**
- **Framework & Bundler**: [React](https://react.dev/) & [Vite](https://vitejs.dev/)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Cliente GraphQL**: [Apollo Client](https://www.apollographql.com/docs/react/)
- **Estilização & UI**: [TailwindCSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Formulários & Validação**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Gerenciamento de Estado**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Ícones**: [Lucide React](https://lucide.dev/)

---

## 📝 TODO List / Funcionalidades Concluídas

- [x] **Autenticação & Usuários**
  - [x] Cadastro de usuário (`register`) com senhas hash (`bcryptjs`)
  - [x] Login de usuário (`login`) gerando JWT
  - [x] Middleware `IsAuth` para validação e extração de `userId`
  - [x] Consulta `me` e atualização de perfil do usuário
- [x] **Regras de Negócio & Isolamento**
  - [x] Garantia de acesso exclusivo: usuários visualizam e gerenciam apenas suas próprias transações e categorias
- [x] **Módulo de Transações**
  - [x] Criar transação (`createTransaction`)
  - [x] Editar transação (`updateTransaction`)
  - [x] Deletar transação (`deleteTransaction`)
  - [x] Listar transações com filtros e paginação (`listTransactions`)
  - [x] Contagem total de transações (`countTransactions`)
- [x] **Módulo de Categorias**
  - [x] Criar categoria (`createCategory`)
  - [x] Editar categoria (`updateCategory`)
  - [x] Deletar categoria (`deleteCategory`)
  - [x] Listar categorias com estatísticas (`listCategorys`)
- [x] **Front-end & Interface**
  - [x] Rota raiz (`/`) condicional (Login para deslogados / Dashboard para autenticados)
  - [x] Componente declarativo `<If condition={...} fallback={...}>` para renderização condicional limpa no JSX
  - [x] Modais responsivos para criação e edição de transações e categorias
  - [x] Notificações interativas (Toasts) para feedback ao usuário
- [x] **DevOps & Configurações**
  - [x] Arquivo `.env.example` no Back-end (`DATABASE_URL`, `JWT_SECRET`)
  - [x] Arquivo `.env.example` no Front-end (`VITE_BACKEND_URL`, `VITE_API_URL`)
  - [x] Habilitação de CORS no servidor GraphQL
  - [x] Verificação de tipos com TypeScript sem erros (`npx tsc --noEmit`)

---

## 🚀 Como Executar o Projeto Localmente

### **Pré-requisitos**
- Node.js (versão 18 ou superior)
- pnpm (ou npm / yarn)

---

### 1️⃣ **Executando o Back-end**

```bash
# Navegar até a pasta do backend
cd back # (ou cd backend)

# Instalar as dependências
pnpm install

# Copiar as variáveis de ambiente
cp .env.example .env

# Rodar as migrações/push do banco de dados SQLite com Prisma
npx prisma db push

# Iniciar o servidor de desenvolvimento
pnpm dev
```
O backend estará rodando em `http://localhost:4000/graphql`.

---

### 2️⃣ **Executando o Front-end**

```bash
# Navegar até a pasta do frontend
cd front # (ou cd frontend)

# Instalar as dependências
pnpm install

# Copiar as variáveis de ambiente
cp .env.example .env

# Iniciar o servidor de desenvolvimento Vite
pnpm dev
```
O frontend estará acessível em `http://localhost:5173`.

---

## 📄 Licença

Este projeto é desenvolvido para fins educacionais como parte do programa de pós-graduação.
