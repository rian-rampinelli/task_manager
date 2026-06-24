# Gerenciamento de Tarefas

Aplicação fullstack para gerenciamento de tarefas com suporte a categorias e usuários. Backend em Java com Spring Boot, frontend em React.

**Requisitos:** Java 21, Node 18+, PostgreSQL 14+

## Tecnologias

- **Backend:** Java 21, Spring Boot, Hibernate/JPA, Lombok
- **Banco de dados:** PostgreSQL
- **Frontend:** React, Vite, Tailwind CSS

## Como executar

### Backend

Crie um banco com PostgreSQL chamado `task-manager` e configure a senha em um arquivo `.env` na raiz do backend:

```env
DB_PASSWORD=sua_senha
```

```bash
git clone https://github.com/rian-rampinelli/task_manager
cd backend
./mvnw spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Swagger
Swagger disponível em `http://localhost:8080/swagger-ui/index.html` com a aplicação rodando.

## Endpoints

### User — `/user`

```json
POST /user
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123"
}
```

### Category — `/category`

```json
POST /category
{
  "name": "Trabalho",
  "description": "Tarefas relacionadas ao trabalho",
  "userId": 1
}
```

### Task — `/task`

```json
POST /task
{
  "title": "Revisar relatorio",
  "description": "Revisar o relatorio mensal",
  "priority": "HIGH",
  "statusLevel": "TODO",
  "userId": 1,
  "categoryId": 1
}
```

`priority`: `LOW` `MEDIUM` `HIGH`  
`statusLevel`: `TODO` `DONE`

Todos os endpoints seguem o padrão REST: `GET /entidade`, `GET /entidade/{id}`, `POST /entidade`, `PUT /entidade/{id}`, `DELETE /entidade/{id}`.

## Regras de negócio

- Toda tarefa e categoria precisam de `userId`.
- `categoryId` é opcional na tarefa.
- Email de usuário é único.

## Tratamento de erros

Exceções tratadas globalmente em `RestExceptionHandler`:

| Status | Situação |
|--------|----------|
| 400 | Dados inválidos ou JSON malformado |
| 404 | Recurso não encontrado |
| 409 | Email duplicado ou violação de chave única |

## Estrutura

```
backend/src/main/java/com/rian/task_manager/
├── user
├── task
├── category
├── config
├── exceptions
└── infra

frontend/src/
├── api
├── assets
├── components
├── pages
├── styles
└── contexts
```