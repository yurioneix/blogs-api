# API de Blogs

Projeto desenvolvido no módulo de Backend, onde foi criado uma API Resftul de um Blog, em Node.js, utilizando o Sequelize como ORM.

## Instalação

<details>
  
 <summary><strong>👉 Com Docker</strong></summary> 
  
  **:warning: Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está com `1.26.0` por `1.29.2`.**
  
  > :information_source: Rode os serviços `node` e `db` com o comando `docker-compose up -d`.
  
  - Lembre-se de parar o `mysql` se estiver usando localmente na porta padrão (`3306`), ou adapte, caso queria fazer uso da aplicação em containers;
  - Esses serviços irão inicializar um container chamado `store_manager` e outro chamado `store_manager_db`;
  - A partir daqui você pode rodar o container `store_manager` via CLI ou abri-lo no VS Code.
  
  > :information_source: Opção 1: Use o comando `docker-compose run --rm node npm test`, ou para acessar o container e executar lá:
  
  > :information_source: Opção 2: Use o comando `docker exec -it store_manager bash` e sigas passos abaixo.
  
  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.
  
  > :information_source: Instale as dependências [**Caso existam**] com `npm install` dentro do container store_manager
  
  - **:warning: Atenção:** Caso opte por utilizar o Docker, **TODOS** os comandos disponíveis no `package.json` (npm start, npm test, npm run dev, ...) devem ser executados **DENTRO** do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima.
  
  - **:warning: Atenção:** O **git** dentro do container não vem configurado com suas credenciais. Ou faça os commits fora do container, ou configure as suas credenciais do git dentro do container.
</details>

<details>
  <summary><strong>👉 Sem Docker</strong></summary>
  > :information_source: Instale as dependências [**Caso existam**] com <code>npm install</code>
  
  - **⚠️ **Atenção**** Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.
  - **⚠️ **Atenção**** A versão do `Node.js` e `NPM` a ser utilizada é `"node": ">=16.0.0"` e `"npm": ">=7.0.0"`, como descrito na chave `engines` no arquivo `package.json`. Idealmente deve-se utilizar o Node.js na versão `16.14`, a versão na qual este projeto foi testado.
  - Crie um arquivo `.env` na raiz do projeto seguindo o padrão do arquivo [`env.example`](./env.example) e o modifique de acordo com a necessidade.
  - Coloque `env $(cat .env)` antes de qualquer comando que for executar, por exemplo:
  
  ```bash
  env $(cat .env) npm run dev
  ```
</details>

## Endpoints
- <strong> POST `/login` </strong> 

<details>
  <summary>Realiza o login no Blog</summary>
  
  - O corpo da requisição deverá seguir o formato abaixo:
  
  ```json
        {
          "email": "lewishamilton@gmail.com",
          "password": "123456"
        }
  ```

- Se a requisição não tiver todos os campos devidamente preenchidos(não pode haver campos em branco), o resultado retornado será conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "Some required fields are missing"
    }
    ```

- Se a requisição receber um par de `email` e `password` errados/inexistentes no banco, o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "Invalid fields"
    }
    ```
- Se o login foi feito com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
    }
    ```
</details> 

<br>

- <strong> POST `/user` </strong>

<details>
  <summary>Cadastra um novo usuário no Blog</summary>

  - O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "password": "123456",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
    // a imagem não é obrigatória
  }
  ```

- Se a requisição não tiver o campo `displayName` devidamente preenchido com 8 caracteres ou mais, o resultado retornado será conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "\"displayName\" length must be at least 8 characters long"
    }
    ```

- Se a requisição não tiver o campo `email` devidamente preenchido com o formato `<prefixo@dominio>`, o resultado retornado será conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "\"email\" must be a valid email"
    }
    ```
    
- Se a requisição não tiver o campo `password` devidamente preenchido com 6 caracteres ou mais, o resultado retornado será conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "\"password\" length must be at least 6 characters long"
    }
    ```

 - Se a requisição enviar o campo `email` com um email que já existe, o resultado retornado será conforme exibido abaixo, com um status http `409`:
  ```json
  {
    "message": "User already registered"
  }
  ```

 - Se o user for criado com sucesso o resultado retornado será conforme exibido abaixo, com um status http `201`:
    ```json
      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
      }
      ```
</details>

<br>

- <strong> GET `/user` </strong>

<details>
  <summary>Lista todos os usuários do Blog</summary>

  - Necessário fornecer um token autenticado no cabeçalho da requisição, no campo "Authorization" para acessar a rota.

  - Se o token for inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
    ```json
    {
      "message": "Token not found"
    }
    ```
    
  - Se o token for inválido o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
    ```json
    {
      "message": "Expired or invalid token"
    }
    ```

   - Ao listar usuários com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
  ```json
  [
    {
        "id": 1,
        "displayName": "Lewis Hamilton",
        "email": "lewishamilton@gmail.com",
        "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    },

    /* ... */
  ]
  ```
</details>

<br>

- <strong> GET `/user/:id`</strong>

<details>
  <summary>Busca um usuário do Blog pelo seu id</summary>

  - Necessário fornecer um token autenticado no cabeçalho da requisição, no campo "Authorization" para acessar a rota.

  - Se o token for inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
    ```json
    {
      "message": "Token not found"
    }
    ```
    
  - Se o token for inválido o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
    ```json
    {
      "message": "Expired or invalid token"
    }
    ```

  - Se o usuário for inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `404`:
    ```json
    {
      "message": "User does not exist"
    }
    ```

  - Ao listar um usuário com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    }
    ```
</details>

<br>

- <strong> POST `/categories` </strong>

<details>
  <summary>Cria uma categoria de post do Blog</summary>

  - O corpo da requisição deverá seguir o formato abaixo:
    ```json
    {
      "name": "Typescript"
    }
    ```

  - Se a requisição não tiver o campo `name` devidamente preenchidos(não pode haver campo em branco), o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "\"name\" is required"
    }
    ```

- Se a categoria for criada com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `201`:
    ```json
    {
      "id": 3,
      "name": "Typescript"
    }
    ```
</details>

<br>

- <strong> GET `/categories` </strong>

<details>
  <summary>Lista todas as categorias de posts cadastrados no Blog</summary>

  - Necessário fornecer um token autenticado no cabeçalho da requisição, no campo "Authorization" para acessar a rota.

  - Se o token for inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
    ```json
    {
      "message": "Token not found"
    }
    ```
    
  - Se o token for inválido o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
    ```json
    {
      "message": "Expired or invalid token"
    }
    ```
    
   - Ao listar categorias com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
  ```json
          [
            {
                "id": 1,
                "name": "Inovação"
            },
            {
                "id": 2,
                "name": "Escola"
            },
   
            /* ... */
          ]
  ```
</details>

<br>

- <strong> POST `/post` </strong>

<details>
  <summary>Cria um post para o Blog</summary>

  - O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "categoryIds": [1, 2]
  }
  ```

  - Se a requisição não tiver todos os campos devidamente preenchidos(não pode haver campos em branco), o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
      ```json
      {
        "message": "Some required fields are missing"
      }
      ```
  - Se a requisição **não** tiver o campo `categoryIds` devidamente preenchido com um array com **todas** as categorias existentes, o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "one or more \"categoryIds\" not found"
    }
    ```

 - Se o blog post for criado com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `201`:
    ```json
    {
      "id": 3,
      "title": "Latest updates, August 1st",
      "content": "The whole text for the blog post goes here in this key",
      "userId": 1,
      "updated": "2022-05-18T18:00:01.196Z",
      "published": "2022-05-18T18:00:01.196Z"
    }
    ```

</details>
