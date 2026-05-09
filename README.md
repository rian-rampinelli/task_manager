# Task Manager


API REST desenvolvida como projeto de estudo com o objetivo de aplicar conceitos de desenvolvimento backend utilizando o ecossistema Spring.

A aplicação permite o gerenciamento de usuários e suas atividades/tasks, permitindo que as  tasks sejam agrupadas por categorias.

---

## Tecnologias utilizadas

* Java - 21.0.11
* Mavem - 3.9.15
* Spring Boot
* Spring Data JPA
* PostgreSQL
* Lombok
* Swagger (OpenAPI)

---

## Configuração

Configure as credenciais do banco de dados no arquivo `application.yml`:

```properties
datasource:
    url: jdbc:postgresql://127.0.0.1:5432/{NOME DO BANCO CRIADO NO POSTGRES)
    username: postgres
    password: {SUA SENHA DO POSTGRESS}
```

---

## Como executar o projeto

```bash
# Clonar repositório
git clone https://github.com/riangkmc/task-managers

# Entrar na pasta
cd task-managers

# Executar o projeto Via Mavem
mvn spring-boot:run
```


---

## Endpoints da API

### 👤 Usuários

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/users` | Listar usuários |
| `POST` | `/users` | Criar usuário |
| `GET` | `/users/{id}` | Buscar por ID |
| `PUT` | `/users/{id}` | Atualizar usuário |
| `DELETE` | `/users/{id}` | Deletar usuário por ID |
| `DELETE` | `/users` | Deletar todos os usuários e suas respectivas tasks e categorias |

### 📍 Categorias

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/categories` | Listar categorias |
| `GET` | `/categories/{id}` | Buscar categoria por ID |
| `POST` | `/categories` | Criar categoria |
| `PUT` | `/categories/{id}` | Atualizar categoria |
| `DELETE` | `/categories/{id}` | Deletar categoria por ID |

---

### ✅ Tasks

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/tasks` | Listar tarefas |
| `GET` | `/tasks/{id}` | Buscar tarefa por ID |
| `POST` | `/tasks` | Criar tarefa |
| `PUT` | `/tasks/{id}` | Atualizar tarefa |
| `DELETE` | `/tasks/{id}` | Deletar tarefa por ID |

---

## Documentação da API (Swagger)

A documentação interativa da API está disponível via Swagger:

👉 http://localhost:8080/swagger-ui/index.html

Através dela, é possível visualizar e testar todos os endpoints diretamente pelo navegador.

---


##  Melhorias futuras

* Implementar autenticação e autorização com JWT
* Adicionar testes automatizados
* Integra com front(React)

---

##  Autor

Rian Barbosa Rampinelli Delgado
