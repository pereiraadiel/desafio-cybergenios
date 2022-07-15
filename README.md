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
- [ ] <i>Dockerizar</i> a aplicação
      <br/>
      <br/>

## 💻 Tecnologias utilizadas

- Nest.js
- Typescript
- Prisma (ORM)
- SQLite ou Postgresql
- Bcrypt
  <br/>
  <br/>

## 📂 Arquitetura implementada

<p>
  Me baseei nos conceitos de clean architecture para construir esse projeto tentando manter o código o mais claro possível.<br/>
  Na camada de <strong>infra</strong> implementei os controllers devidamente separados de acordo com os casos de uso.<br/>
  A camada de <strong>usecases</strong> é responsável pela lógica especifica da aplicação e nela os casos de uso estao separados em modulos (auth, cars, users).
</p>
