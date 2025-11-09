#SysWork

> _Este projeto está em desenvolvimento e pode ser adaptado para diferentes contextos empresariais._

## Tecnologias Utilizadas

- **Node.js** — Ambiente de execução JavaScript
- **Express.js** — Framework para criação da API REST
- **Sequelize ORM** — Mapeamento objeto-relacional e controle de migrations
- **MySQL** — Banco de dados relacional
- **bcrypt.js** — Hash de senhas
- **jsonwebtoken (JWT)** — Autenticação segura
- **dotenv** — Gerenciamento de variáveis de ambiente
- **Nodemon** — Atualização automática durante o desenvolvimento

# SYSWORK

API desenvolvida em Node.js com Sequelize ORM, autenticação JWT, e estrutura modular baseada em controllers, services e routes. O projeto segue boas práticas de arquitetura e versionamento de banco com migrations e seeders.

## Sumário

- [Visão Geral]
- [Tecnologias Utilizadas]
- [Pré-requisitos]
- [Instalação]
- [Executando as Migrations e Seeders]
- [Inicializando o Servidor]
- [Endpoints Principais]
- [Scripts Úteis]
- [Boas Práticas e Organização]
- [Licença]

## Visão Geral

O SYSWORK é uma API voltada à gestão de chamados, onde o usuário autenticado pode: abrir chamado para resolução de demanda para o seu setor e direcionar para o setor responsável por resolve-lo, o usuário do setor pode ver uma lista de chamados abertos para o seu setor e mudar seu status de acordo com a situação atual do chamado (aberto, em progresso e concluído). Ela permite o controle de usuários autenticados, departamentos organizacionais, funções internas e o gerenciamento de chamados entre diferentes setores.
Ela também permite busca de chamados por setor solicitante e setor executante, busca de usuários por setor e por função.

No momento, também esta sendo implementado, métodos de busca de chamados por usuários solicitantes.

## Tecnologias Utilizadas

- **Node.js** (runtime)
- **Express.js** (framework HTTP)
- **Sequelize** (ORM)
- **MySQL** (banco de dados)
- **dotenv** (variáveis de ambiente)
- **jsonwebtoken (JWT)** (autenticação)
- **bcryptjs** (hash de senha)
- **sequelize-cli** (migrations e seeders)

## Pré-requisitos

-- **Node.js(>= 18)**
-- **MySQL**
-- **npm ou yarn**

## Instalação

--**git clone https://github.com/jadsonkenard/syswork.git**
--**cd syswork**
--**npm install**

>Seu .env deve conter
PORT = 8000 //porta

*DB_HOST*=localhost
*DB_USER*=usuario do banco
*DB_PAS*S=senha do banco
*DB_NAME*=nome do banco de dados ex: syswork
*DB_DIALECT*=mysql
*DB_PORT*=3306

//chave secreta ex:
*JWT_ACCESS_SECRET*=FzGXv4Fs5iT9aTACMSQ15OZFGKU131Sf995-HDAoUJw

//chave secreta refrash token ex:
*JWT_REFRESH_SECRET*=FzHXv4Ss5iT9aTACNSQ15OZFGZU131Sf995-UIToJUw

//tempo de expiração do token gerado ex:
*JWT_ACCESS_EXPIRES*=15m

//tempo de expiração do refrash token gerado ex:
*JWT_REFRESH_EXPIRES*=7d

## Executando as Migrations e Seeders

>Crie as tabelas no banco de dados com:
--**npx sequelize-cli db:migrate**

>Popule o banco com dados iniciais (usuário admin, etc.):
--**npx sequelize-cli db:seed:all**

>Para reverter:
**npx sequelize-cli db:migrate:undo:all**
**npx sequelize-cli db:seed:undo:all**

>os chamados (tickets) podem ser criados via postman, insomnia e etc...depois de criados funções, setores e usuários.

## Inicializando o Servidor

**npm start**

## Endpoints Principais

| Recurso     | Método | Endpoint       | Descrição                    |
| :---------- | :----: | :------------- | :--------------------------- |
| Auth        |  POST  | `/login`       | Login e geração de token JWT |
| Users       |  GET   | `/users`       | Lista todos os usuários      |
| Users       |  GET   | `/users/:id`   | Busca usuário por ID         |
| Departments |  GET   | `/departments` | Lista departamentos          |
| Positions   |  GET   | `/positions`   | Lista funções/cargos         |
| Tickets     |  POST  | `/tickets`     | Criação de novo ticket       |

> As rotas protegidas exigem o header `Authorization: Bearer <token>`.

## Scripts Úteis

--**npm start | Inicia o servidor em modo produção**
--**npx sequelize-cli db:migrate | Executa todas as migrations**
--**npx sequelize-cli db:seed:all | Executa todos os seeders**
--**npx sequelize-cli db:migrate:undo | Desfaz a última migration**
--**npx sequelize-cli db:seed:undo:all | Desfaz todos os seeders**

## Boas Práticas e Organização

--**Cada Model representa uma tabela no banco de dados.**
--**Cada Service contém a lógica de negócio.**
--**Cada Controller trata as requisições e respostas.**
--**Middlewares gerenciam autenticação e autorização.**
--**Migrations e Seeders garantem consistência e versionamento de banco.**

## Licença

Este projeto está sob a licença MIT.
Sinta-se livre para usar, modificar e distribuir conforme necessário.