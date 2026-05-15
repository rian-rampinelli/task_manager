# API REST de Gerenciamento de Tarefas

O projeto aplica os conceitos de modelagem orientada a objetos, persistencia com PostgreSQL, organizacao em camadas, DTOs de request/response, tratamento global de excecoes, auditoria e documentacao com Swagger.

## Tecnologias

- Java 21
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Swagger / OpenAPI
- Maven
- dotenv-java

## Estrutura

```text
src/main/java/com/rian/task_manager
+-- user         # Controllers REST, Services e Repositories do usuário
+-- task         # Controllers REST, Services e Repositories da tarefa
+-- category     # Controllers REST, Services e Repositories da categoria
+-- config       # Pasta de configurações (auditable,swaggerConfig)
+-- exceptions   # Excecoes customizadas
+-- infra        # Tratamento global de erros
```

## Relacionamentos

- Um usuario pode ter varias categorias.
- Uma categoria pertence a um usuario.
- Um usuario pode ter varias tarefas.
- Uma tarefa pertence a um usuario e opcionalmente a uma categoria.
- Uma categoria pode ter varias tarefas.

## Regras de negocio

- Toda tarefa deve estar associada a um usuario.
- Nao e permitido criar tarefa sem `userId`.
- A categoria e opcional para uma tarefa.
- Toda categoria deve estar associada a um usuario.
- Nao e permitido criar categoria sem `userId`.
- Nao e permitido dois usuarios com o mesmo email.

## Auditoria

Todas as entidades herdam a classe `Auditable`, que registra automaticamente:

- `createdAt`
- `updatedAt`

Esses campos sao preenchidos pelo Spring Data JPA Auditing e tambem aparecem nos DTOs de resposta.

## Tratamento de erros

A API possui tratamento global de excecoes em `RestExceptionHandler`.

Formato padrao de erro:

```json
{
  "status": 404,
  "error": "Not Found",
  "message": "Usuario nao encontrado"
}
```

Erros tratados:

- `400 Bad Request`: dados invalidos, JSON malformado ou parametro invalido.
- `404 Not Found`: recurso inexistente.
- `409 Conflict`: violacao de integridade no banco, como chave unica ou email duplicado.


## Configuracao

Crie um banco PostgreSQL chamado:

```text
task-manager
```

Configure a senha do banco em uma variavel de ambiente ou em um arquivo `.env` na raiz do projeto:

```env
DB_PASSWORD=sua_senha
```

O arquivo `src/main/resources/application.yaml` usa:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/task-manager
    username: postgres
    password: ${DB_PASSWORD}
  jpa:
    hibernate:
      ddl-auto: update
```

## Como executar

```powershell
.\mvnw.cmd spring-boot:run
```

Ou, se estiver usando Maven instalado:

```powershell
mvn spring-boot:run
```

## Swagger

Com a aplicacao rodando, acesse:

```text
http://localhost:8080/swagger-ui/index.html
```

## Padrao de endpoints

Cada entidade segue o padrao:

| Metodo | Endpoint | Descricao |
|--------|----------|-----------|
| GET | `/entidade` | Lista todos os registros |
| GET | `/entidade/{id}` | Busca por ID |
| POST | `/entidade` | Cria um registro |
| PUT | `/entidade/{id}` | Atualiza um registro |
| DELETE | `/entidade/{id}` | Remove por ID |

## Endpoints

### User

Base URL:

```text
/user
```

Exemplo de criacao:

```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123"
}
```



### Category

Base URL:

```text
/category
```

Exemplo de criacao:

```json
{
  "name": "Trabalho",
  "emoji": "💼",
  "description": "Tarefas relacionadas ao trabalho",
  "userId": 1
}
```



### Task

Base URL:

```text
/task
```

Exemplo de criacao:

```json
{
  "title": "Revisar relatorio",
  "description": "Revisar o relatorio mensal e enviar para o gerente",
  "priority": "HIGH",
  "statusLevel": "TODO",
  "userId": 1,
  "categoryId": 1
}
```



Valores de `priority`:

```text
LOW, MEDIUM, HIGH
```

Valores de `statusLevel`:

```text
TODO, IN_PROGRESS, DONE
```

## Testes manuais

Sugestao de ordem para testar no Postman, Insomnia ou Swagger:

1. Criar um usuario.
2. Criar uma categoria associada ao usuario.
3. Criar uma tarefa associada ao usuario e categoria.
4. Listar todos os usuarios.
5. Listar todas as categorias.
6. Listar todas as tarefas.


## Observacoes

- O projeto usa `ddl-auto=update`, entao o Hibernate atualiza as tabelas automaticamente conforme as entidades.
- O campo `createdAt` e `updatedAt` sao preenchidos automaticamente pelo Spring Data JPA Auditing.
- Para rodar testes e build, o `JAVA_HOME` precisa apontar para um JDK valido.
- O email do usuario e unico e nao pode ser duplicado.
