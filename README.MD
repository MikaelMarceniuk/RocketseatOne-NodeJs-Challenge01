# Nodejs formation - Challenge 01

## Descrição Geral do Projeto:

API REST em Node.js para gestão de tarefas, com operações CRUD e suporte para importação em formato CSV.

## Requisitos e Dependências:

Certifique-se de ter Node.js instalado (versão 20.10.0)

## Instalação

Clone o repositório e execute o seguinte comando para instalar as dependências:

```sh
npm  install
```

## Executar em ambiente local:

Execute o seguinte comando para poder rodar a API localmente

```sh
npm run start:dev
```

## API

### Listar tarefas

**Endpoint:**

```http
GET /tasks
```

**Descrição:**
Retorna a lista completa de tarefas salvos no banco de dados

**Query Params:**
|Chave|Valor|
|--|--|
|title|string|
|description|string|

### Criar tarefa

**Endpoint:**

```http
POST /tasks
```

**Descrição:**
Cria uma nova tarefa com base nos dados fornecidos no corpo da solicitação.

**JSON esperado no body da requisicao**

```json
{
  "title": "string",
  "description": "string"
}
```

### Atualizar tarefa

**Endpoint:**

```http
PUT /tasks/:id
```

**Descrição:**
Atualiza uma tarefa existente com base no ID fornecido e nos dados fornecidos no corpo da solicitação.

**JSON esperado no body da requisicao**

```json
{
  "name": "string",
  "description": "string"
}
```

### Completar tarefa

**Endpoint:**

```http
PATCH /tasks/:id/complete
```

**Descrição:**
Completa uma tarefa, se a tarefa ja estiver completada, voltara para o valor inicial

### Excluir tarefa

**Endpoint:**

```http
DELETE /tasks/:id
```

**Descrição:**

Exclui uma tarefa existente com base no ID fornecido.

### Importar tarefa

**Endpoint:**

```http
POST /tasks/import
```

**Descrição:**

Importa as tarefas dentro do arquivo src/mock/tasks.csv
