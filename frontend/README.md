# 🧑‍💻 Sistema de Gerenciamento de Voluntários - Frontend

Frontend desenvolvido em React com Vite e TypeScript para gerenciamento de voluntários.

## 🚀 Tecnologias utilizadas

- React
- Vite
- TypeScript
- TailwindCSS
- TanStack Query (React Query)
- Axios
- React Hook Form + Zod
- Lucide React (ícones)
- Sonner (toast)

---

## ▶️ Como rodar o projeto

### 1. Instalar dependências
```bash
npm install
```
### 2. Configurar variáveis de ambiente
Crie um arquivo .env na raiz do frontend:
```bash
VITE_API_URL=http://localhost:8000
```

### 3. Rodar a aplicação
```bash
npm run dev
```

A aplicação estará disponível em:
```bash
http://localhost:5173
```

## 📄 Páginas da aplicação
- / → Listagem de voluntários
- /create → Cadastro de voluntário
- /edit/:id → Edição de voluntário

## 🧱 Estrutura de pastas
```bash
src/
├── api/              # integração com backend
├── components/       # componentes reutilizáveis
├── hooks/            # hooks com React Query
├── pages/            # páginas da aplicação
├── schemas/          # validação com Zod
├── types/            # tipagens TypeScript
├── utils/            # funções auxiliares
```

## ⚙️ Funcionalidades
- CRUD completo de voluntários
- Filtros por:
  - status
  - cargo
  - disponibilidade
  - busca por nome/email
- Validação de formulário
- Tratamento de erro (email duplicado - 409)
- Feedback com toast
- Loading e empty states

## 🧠 Decisões técnicas
- Uso do React Query para controle de estado assíncrono e cache
- Zod + React Hook Form para validação robusta
- TailwindCSS para estilização rápida e consistente
- Componentização para facilitar manutenção e escalabilidade
- Separação clara entre:
  - camada de API
  - hooks
  - UI

## 🔗 Integração com backend

Este frontend consome uma API REST desenvolvida com FastAPI.
O backend deve estar rodando em:
```bash
http://localhost:8000
```

## ⚠️ Observações
Não foi utilizado mock — integração real com backend
Não possui autenticação (fora do escopo do desafio)

## 📌 Status do projeto

✅ CRUD funcionando
✅ Filtros funcionando
✅ Integração com backend
