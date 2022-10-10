# Simulador de um Placar de Campeonato de Futebol

Este projeto é uma aplicação FullStack que simula o placar de um campeonato de futebol. O projeto conta com duas aplicações, uma para o Frontend e outra para o Backend.
Teve como objetivo principal o desenvolvimento da API no backend, desde a configuração do ambiente, até a implementação das regras de negócio. Foi desenvolvido utilizando conceitos de `Programação Orientada a Objetos`, `REST`, `SOLID`, `TDD` e `Arquitetura MSC` (Model, Service e Controller). 

## [**Backend**](https://github.com/vitorbss12/FullStack-App-Football-Championship-Scoreboard/tree/main/backend)
O backend foi desenvolvido utilizando principalmente `Node.js`, `TypeScript`, `Express` e `Sequelize` e `MySLQ`. A API conta com as seguintes funcionalidades:
  - Endpoints para Login
    - É possível realizar o login de usuários com o perfil de administrador e de usuários comuns.
    - A senha é criptografada utilizando o algoritmo `bcrypt`.
    - A autenticação é feita utilizando o `JWT`.
  - Endpoints para Times
    - É possível acessar todos os times cadastrados no banco de dados.
    - Acesso a times por id.
  - Endpoints para Partidas do campeonato
    - Acesso a todas as partidas cadastradas no banco de dados.
    - Acesso a partidas filtradas por:
      - Partidas em andamento
      - Partidas finalizadas
    - Cadastrar partidas no banco de dados.
      - Apenas usuários com o perfil de administrador podem cadastrar partidas.
      - Possui validação para não permitir que partidas sejam cadastradas com times repetidos, informações inválidas utilizando `joi` ou token `JWT` inválido.
    - Editar partidas no banco de dados.
      - Apenas usuários com o perfil de administrador podem cadastrar partidas.
      - Possui validações com `joi` para não permitir que partidas sejam editadas com informações inválidas ou token `JWT` inválido.
  - Endpoints para o placar do campeonato
    - Acesso ao placar do campeonato.
    - Acesso ao placar do campeonato filtrado por:
      - Times da casa
      - Times visitantes
      - Pontuação total por time

**Para mais informações sobre o backend, acesse o [README](https://github.com/vitorbss12/FullStack-App-Football-Championship-Scoreboard/blob/main/backend/README.md).**

## [**Frontend**](https://github.com/vitorbss12/FullStack-App-Football-Championship-Scoreboard/tree/main/frontend)
O front end foi uma aplicação inicialmente disponibilizada pela Trybe, e foram realizadas poucas refatorações. A aplicação foi desenvolvida utilizando `React`, nela é possível consumir a API desenvolvida no backend pela url `http://localhost:3001` através dos endpoints desenvolvidos no backend. A aplicação conta com as seguintes funcionalidades:
  - Visualizar o placar do campeonato, podendo filtrar por:
    - Por times da casa
    - Por times visitantes
    - Pontuação total	por time
  - Visualizar Partidas do campeonato, podendo filtrar por:
    - Todas
    - Partidas em andamento
    - Partidas finalizadas
  - Login e Logout de usuários
  - Adicionar Partidas ao campeonato
    - É necessário informar o time da casa, o time visitante e o placar da partida.
    - Apenas usuários com o perfil de administrador podem adicionar partidas ao campeonato.
  - Editar Partidas do campeonato
    - É possível informar o time da casa, o time visitante e o placar da partida.
    - Apenas usuários com o perfil de administrador podem editar partidas do campeonato.
  
**Para mais informações sobre o frontend, acesse o [README](https://github.com/vitorbss12/FullStack-App-Football-Championship-Scoreboard/blob/main/frontend/README.md).**

## Conteúdo

- [Simulador de um Placar de Campeonato de Futebol](#simulador-de-um-placar-de-campeonato-de-futebol)
  - [**Backend**](#backend)
  - [**Frontend**](#frontend)
  - [Conteúdo](#conteúdo)
- [**Estrutura da Aplicação**](#estrutura-da-aplicação)
- [**Instruções**](#instruções)
    - [**Instalação e Execução**](#instalação-e-execução)
- [**Observações**](#observações)

# **Estrutura da Aplicação**
````
backend
  ├── src
    ├── app.ts            # definições de middlewares e rotas da API
    ├── server.ts         # inicialização da API
    ├── /controllers      # camada de controller - requisição do cliente para a API
    ├── /database         # conexão com o banco de dados via Sequelize
      ├── /config         # config sequelize
      ├── /migrations     # migrations sequelize
      ├── /models         # models sequelize
      ├── /seeders        # seeders sequelize
    ├── /interfaces       # interfaces da aplicação
    ├── /middlewares      # Validação e autenticação de dados
    ├── /models           # camada de model isolada
    ├── /routes           # rotas para cada endpoint
    ├── /services         # camada de service - regras de negócio
    ├── /shared           # funções compartilhadas
    ├── /tests            # testes de integração

frontend
  ├── public
  ├── src
    ├── App.js            # definições de rotas e paginas da aplicação
    ├── index.js          # inicialização da aplicação
    ├── /components       # componentes da aplicação
    ├── /images           # imagens da aplicação
    ├── /pages            # páginas da aplicação
    ├── /services         # requests a API
    ├── /styles           # estilização da aplicação
  ````

# **Instruções**

### **Instalação e Execução**

A instalação e execução vai depender do ambiente (`Local` ou `Docker`) que você está utilizando. Para executar localmente veja no README do [Frontend]() e do [Backend](). As instruções a seguir são para execução utilizando Docker.

Para executar o projeto é necessário:
  - O **Node** deve ter versão igual ou superior à 16.14.0 LTS
  - O **Docker** e que o **docker-compose** tenha versão igual ou superior à 1.29.2

####
**1) Instalar dependências:**
````
npm install
````
A instalação das dependências no frontend e no backend ocorrem de forma automática ao executar `npm install` na raiz do projeto.

**2) Executar aplicação com Docker:**
Subir os containers
````
npm run compose:up
````

Excluir os containers
````
npm run compose:down
````
Esse comando sobe a aplicação e realiza o build utilizando o docker-compose.yml.
Para executar a aplicação com **live-reload** utilize o docker-compose.dev.yml com os comandos abaixo:
````
npm compose:up:dev
````
````
npm compose:down:dev
````

**3) Exibir Logs**
````
npm run logs
````
Para visualizar os logs dos containers.

# **Observações**

- Este é um projeto de estudo desenvolvido durante minha formação na [Trybe](https://www.betrybe.com/). :rocket:

- Quer saber mais sobre mim? Veja o meu [LinkedIn](https://www.linkedin.com/in/vitorbss/).