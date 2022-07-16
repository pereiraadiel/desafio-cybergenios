<h1 align="center">Desafio · <strong>Cyber Gênios</strong></h1>
<br/>

<h2 align="center">Este projeto consiste em uma API para gerir uma concessionária de automovéis fictícia</h2>
<br/>

## 🚧 Lista de Tarefas

- [x] CRUD usuários (clientes | admins)
- [x] CRUD carros
- [x] Autenticação de usuários
- [x] Atribuição e desatribuição de cargo admin
- [x] middleware para validar os dados recebidos via REST API
- [x] middleware para validar autenticação e restringir acessos
- [ ] testes unitários e de integração
- [x] <i>Dockerizar</i> a aplicação
      <br/>
      <br/>

## 💻 Tecnologias utilizadas

- Nest.js
- Typescript
- Prisma (ORM)
- Postgresql
- Bcrypt
  <br/>
  <br/>

## 📂 Arquitetura implementada

<p>
  Me baseei nos conceitos de clean architecture para construir esse projeto tentando manter o código o mais claro possível.<br/>
  Na camada de <strong>infra</strong> implementei os controllers devidamente separados de acordo com os casos de uso.<br/>
  A camada de <strong>usecases</strong> é responsável pela lógica especifica da aplicação e nela os casos de uso estao separados em modulos (auth, cars, users).
</p>
  <br/>
  <br/>

## ⚡ Executar o projeto

<p>Para executar esse projeto utilizando o docker</p>

```sh
  docker compose up -d
```

<p>a aplicação estará rodando em <a href="http://localhost:3000">localhost:3000</a> e pode ser acessada utilizando o <a href="https://insomnia.rest/download">Insomnia</a> ou outro cliente REST</p>

<p>Uma collection do insomnia está disponível na raiz desse repositório para facilitar os testes manuais</p>

<h3>os dados para testes são os seguintes</h3>

```sh
  # usuário admnistrador
  email: admin@cybergenios.com.br
  password: cybergenios

  #usuário cliente
  email: fulano@cybergenios.com.br
  password: fulano
```

<br/>
<br/>

## 🧪 Testes

<p>Como primeiro passo para executar os testes e2e é necessário ter um banco de dados postgres instalado</p>

```sh
  docker run -p 5433:5432 --name pg -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin postgres -d

  docker start pg
```

<p>Rodar as migrations no banco de dados</p>

```sh
  yarn migrate:test
```

<p>Para executar os testes e2e</p>

```sh
  yarn test:e2e
```

<p>Para executar os testes unitários</p>

```sh
  yarn test
```
