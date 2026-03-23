# 🚀 FastAPI - Sistema de Gerenciamento de Voluntários

API REST desenvolvida com FastAPI para cadastro e gerenciamento de voluntários.

## Tecnologias utilizadas

- Python
- FastAPI
- Pydantic
- Poetry
- Pytest
- Ruff
- Taskipy

## ▶️ Como executar o projeto

### 1. Instalar dependências
```bash
poetry install
```
ou (Windows):
```bash
py -m poetry install
```

### 2. Executar a aplicação
```bash
poetry run task run
```
ou:
```bash
py -m poetry run task run
```

### 3. Acessar a documentação
```bash
http://localhost:8000/docs
```

## 📡 Endpoints disponíveis
- POST /voluntarios - Cadastrar novo voluntário
- GET /voluntarios - Listar voluntários com filtros
- GET /voluntarios/{id} - Buscar voluntário específico por ID
- PUT /voluntarios/{id} - Atualizar voluntário
- DELETE /voluntarios/{id} -Deletar voluntário

## 🔍 Filtros disponíveis
- status
- cargo
- disponibilidade

## ⚙️ Funcionalidades implementadas
- CRUD completo
- Validação de email único (409)
- Soft delete (status = inativo)
- Data de inscrição automática
- Filtros dinâmicos
- Validações com Pydantic
- Uso de enums para padronização


## Executar testes
```bash
poetry run task test
```

## Decisões técnicas
- Utilização de banco em memória para simplificação
- Estrutura simples conforme escopo do desafio
- Uso de enums para maior consistência
- Validação de email com EmailStr
