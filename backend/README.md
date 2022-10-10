# BackEnd 

O BackEnd conta com uma `API` desenvolvida utilizando conceitos de `Programação Orientada a Objetos`, `REST`, `SOLID`, `TDD` e `Arquitetura MSC` (Model, Service e Controller). Foi desenvolvido principalmente em `Node.js`, `TypeScript`, `Express`, `JWT`, `Sequelize`, `MySQL`, além de outras ferramentas. Possui opções de login e validação de usuários com `JWT` e `Bcrypt`. Leitura dos times cadastrados no banco. Criação, Leitura e Atualização de partidas no banco, utilizando as validações de usuários. Por fim acesso ao placar com informações completas sobre a atuação de cada time no campeonato. O projeto foi desenvolvido em ambiente de desenvolvimento utilizando containers `Docker`, onde o banco de dados `MySQL` é criado e populado utilizando `Sequelize`.

## Conteúdo

- [BackEnd](#backend)
  - [Conteúdo](#conteúdo)
- [**Arquitetura**](#arquitetura)
    - [**Arquitetura de Camadas MSC**](#arquitetura-de-camadas-msc)
    - [**POO, SOLID, TDD e REST**](#poo-solid-tdd-e-rest)
- [**API - Endpoints**](#api---endpoints)
    - [**`POST /login`**](#post-login)
    - [**`GET /login/validade`**](#get-loginvalidade)
    - [**`GET /teams`**](#get-teams)
    - [**`GET /teams/:id`**](#get-teamsid)
    - [**`GET /matches`**](#get-matches)
    - [**`GET /matches?inProgress=boolean`**](#get-matchesinprogressboolean)
    - [**`POST /matches`**](#post-matches)
    - [**`PATCH /matches/:id`**](#patch-matchesid)
    - [**`PATCH /matches/:id/finish`**](#patch-matchesidfinish)
    - [**``GET /leaderboard/home``**](#get-leaderboardhome)
    - [**``GET /leaderboard/away``**](#get-leaderboardaway)
    - [**``GET /leaderboard``**](#get-leaderboard)
- [**Banco de Dados**](#banco-de-dados)
- [**Instruções**](#instruções)
    - [**Instalação e Execução**](#instalação-e-execução)
- [**Testes**](#testes)
- [**Linter**](#linter)
- [**Observações**](#observações)

# **Arquitetura**

### **Arquitetura de Camadas MSC**

O projeto possui arquitetura de camadas MSC (`Model`, `Service`, `Controller`), onde cada camada é responsável por uma única funcionalidade.

### **POO, SOLID, TDD e REST**

Um dos principais objetivos foi exercer aprendizados referentes aos conceitos de `Programação Orientada a Objetos`, `SOLID`, `TDD` e `REST`. O projeto foi desenvolvido utilizando esses conceitos, onde cada camada possui sua responsabilidade única, seguindo os princípios de `SOLID` e `TDD` foi utilizado para garantir a qualidade do código. **Vale ressaltar que ainda há muito a ser melhorado.**

# **API - Endpoints**

<details>
  <summary><strong>Login</strong></summary>

  ### **`POST /login`**

  Body:
  ````
  {
    "email": "user@user.com",
    "password": "secret_user"
  }
  ````
  - Só é possível fazer login com email e senha válidos. Caso login seja feito com sucesso um token é gerado utilizando o `JWT`.
  - O corpo da requisição deve conter o email e a senha do usuário, é validado utilizando `Joi`.
  - A senha no banco de dados é criptografada e a API utiliza o `Bcrypt` para comparar a senha enviada com a senha criptografada no banco de dados.

  ### **`GET /login/validade`**

  - É necessário enviar o token no header da requisição.
  - Retorna as permissões do usuário como user ou admin.	
  <br />
</details>

<details>
  <summary><strong>Teams</strong></summary>

  ### **`GET /teams`**

  - Retorna todas as equipes cadastradas no banco de dados.

  ### **`GET /teams/:id`**

  - Retorna a equipe com o id passado na rota.
  <br />
</details>

<details>
  <summary><strong>Matches</strong></summary>

  ### **`GET /matches`**

  - Retorna todas as partidas cadastradas no banco de dados.

  ### **`GET /matches?inProgress=boolean`**

  - Retorna partidas que estão em andamento ou finalizadas.

  ### **`POST /matches`**

  Body:
  ````
  {
    "homeTeam": 8,
    "awayTeam": 8,
    "homeTeamGoals": 2,
    "awayTeamGoals": 2
  }
  ````
  - Só é possível criar uma partida se a requisição tiver um token válido no header.
  - O corpo da requisição deve conter o id da equipe da casa, o id da equipe visitante, o número de gols da equipe da casa e o número de gols da equipe visitante, os dados do corpo são validados utilizando `Joi`.
  - Não é possível cadastrar partidas com ids de equipes que não existam.
  - Não é possível criar uma partida com o mesmo id da equipe da casa e visitante.

  ### **`PATCH /matches/:id`**

  Body:
  ````
  {
    "homeTeamGoals": 5,
    "awayTeamGoals": 5
  }
  ````
  - Só é possível atualizar uma partida se a requisição tiver um token válido no header.
  - O corpo da requisição deve conter o número de gols da equipe da casa e o número de gols da equipe visitante, os dados do corpo são validados utilizando `Joi`.
  - Não é possível atualizar uma partida que não exista.

  ### **`PATCH /matches/:id/finish`**

  - Finaliza uma partida com base no id passado na rota.
  - Só é possível finalizar uma partida se a requisição tiver um token válido no header.
  - Não é possível finalizar uma partida que não exista.
  <br />
</details>

<details>
  <summary><strong>LeaderBoard</strong></summary>

  Todas as requisições a seguir possuem o mesmo comportamento, porém com dados diferentes. Formato:
  ````JSON
    {
        "name": "Nome do time",
        "totalPoints": "Total de pontos: (totalVictories * 3) + totalDraws",
        "totalGames": "Total de jogos",
        "totalVictories": "Número de vitórias",
        "totalDraws": "Número de empates",
        "totalLosses": "Número de derrotas",
        "goalsFavor": "Número de gols a favor",
        "goalsOwn": "Número de gols contra",
        "goalsBalance": "Diferença de gols: goalsFavor - goalsOwn",
        "efficiency": "Eficiência: (totalPoints / (totalGames * 3)) * 100"
    },
    ...
  ````

  A ordenação é feita de acordo com a regra:
  - Total de pontos;
  - Total de vitórias;
  - Saldo de gols;
  - Gols a favor;
  - Gols sofridos.

  ### **``GET /leaderboard/home``**

  - Retorna o ranking de equipes da casa.

  ### **``GET /leaderboard/away``**

  - Retorna o ranking de equipes visitantes.

  ### **``GET /leaderboard``**

  - Retorna o ranking geral das equipes.
  <br />
</details>

# **Banco de Dados**

O banco de dados utilizado foi o `MySQL` e o `Sequelize` foi utilizado como ORM. Segue abaixo o diagrama do banco de dados:

![er](../images/erDiagram.png)

# **Instruções**

Para executar o projeto utilizando Docker siga as instruções no README do projeto [aqui](https://github.com/vitorbss12/FullStack-App-Football-Championship-Scoreboard)

### **Instalação e Execução**

Para executar o projeto é necessário:
  - O **Node** deve ter versão igual ou superior à 16.14.0 LTS
  - Ter o **MySQL** instalado e rodando
  - Configuração correta do arquivo `.env` com as variáveis de ambiente

`Scrips` de instalação e execução:
####
**Instalar dependências:**
````
npm install
````

**Iniciar a aplicação:**
````
npm start
````

**Iniciar a aplicação com `Nodemon`:**
````
npm run dev
````

**Reset no banco de dados:**
````
npm run db:reset
````

# **Testes**

A API possui testes de integração desenvolvidos utilizando `Mocha`, `Chai`, `Chai-http` e `Sinon`. Para executar os testes basta rodar o comando:
````
npm test
````

É possivel ver a cobertura de testes utilizando o comando:
````
npm run test:coverage
````

# **Linter**

Este projeto foi desenvolvido utilizando o linter `ESLint` seguindo as boas práticas definidas na [Trybe](https://www.betrybe.com/).

  - Para executar o linter, basta executar o comando:
````
npm run lint
````

# **Observações**

- Este é um projeto de estudo desenvolvido durante minha formação na [Trybe](https://www.betrybe.com/). :rocket:

- Quer saber mais sobre mim? Veja o meu [LinkedIn](https://www.linkedin.com/in/vitorbss/).