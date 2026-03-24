# 🧑‍💻 Sistema de Gerenciamento de Voluntários

Projeto fullstack desenvolvido para gerenciamento de voluntários, com funcionalidades de cadastro, listagem, edição, filtros e controle de status.

O sistema é composto por:

- 🔧 Backend: API REST em FastAPI
- 💻 Frontend: Aplicação React com Vite + TypeScript

---

## 🚀 Tecnologias Utilizadas

### Backend
- Python
- FastAPI
- Pydantic
- Poetry
- Pytest

### Frontend
- React
- Vite
- TypeScript
- TailwindCSS
- TanStack Query (React Query)
- Axios
- React Hook Form + Zod
- Lucide React
- Sonner (toast)

---

## 📦 Estrutura do Projeto

```bash
gerenciamento-de-voluntarios/
├── backend/     # API FastAPI
├── frontend/    # Aplicação React
└── README.md
```

---

## ▶️ Como Rodar o Projeto

### 1. Backend
```bash
cd backend
py -m poetry install
py -m poetry run task run
```

A API estará disponível em: http://localhost:8000

Documentação interativa: http://localhost:8000/docs

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

A aplicação estará disponível em: http://localhost:5173

## ⚙️ Configuração de Ambiente

Crie um arquivo .env dentro da pasta frontend/:
```bash
VITE_API_URL=http://localhost:8000
```

---

## 🎯 Funcionalidades

## Backend
- CRUD completo de voluntários
- Validação de email único (409)
- Soft delete (status = inativo)
- Data de inscrição automática
- Filtros por:
    - status
    - cargo
    - disponibilidade

## Frontend
- Listagem de voluntários
- Cadastro de voluntário
- Edição de voluntário
- Filtros em tempo real:
    - status
    - cargo
    - disponibilidade
    - busca por nome/email
- Validação de formulários
- Tratamento de erros da API
- Feedback com toast
-  Loading e empty states

---

## 🔗 Integração

O frontend consome diretamente a API FastAPI local: http://localhost:8000/voluntarios

---

## 🧠 Decisões Técnicas
- Uso de React Query para gerenciamento de estado assíncrono
- Zod + React Hook Form para validação robusta de formulários
- TailwindCSS para estilização rápida e consistente
- Estrutura modular separando:
    - API
    - Hooks
    - Componentes
    - Páginas
- Backend com estrutura simples e uso de memória (sem banco) conforme escopo do desafio

⚠️ Observações
Backend utiliza armazenamento em memória
Integração real entre frontend e backend (sem mocks)

### 📌 Status do Projeto

✅ Backend completo
✅ Frontend completo
✅ Integração funcionando
✅ Filtros em tempo real
✅ Validação de formulários

---

## Telas

![Frontend: Tela inicial](https://github.com/elanealencar/gerenciador-de-voluntarios/blob/main/frontend/public/front-tela-inicial.png?raw=true)

![Frontend: Tela de Cadastros](https://github.com/elanealencar/gerenciador-de-voluntarios/blob/main/frontend/public/front-cadastro.png?raw=true)

![Backend: Documentação](https://github.com/elanealencar/gerenciador-de-voluntarios/blob/main/frontend/public/back-documentacao.png?raw=true)

---

## 📤 Entrega
Projeto desenvolvido conforme requisitos do desafio técnico
Backend e frontend organizados em módulos independentes
Commits estruturados para demonstrar evolução do desenvolvimento


## 👨‍💻 Autor

Desenvolvido por Elane Alencar