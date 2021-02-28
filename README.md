# Simple App Event Manager

Simples aplicação para gerenciamentos de enventos.

Requisitos para aplicação.

- Instalado Node

- npm e/ou yarn

- Instalado PostgreSQL

- Instalado Docker

---

## Video demonstrativo

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/TC_ZZyIs9wo/maxresdefault.jpg)](https://youtu.be/TC_ZZyIs9wo)

## Vídeo como configurar

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/TsmCYJWq6Sw/maxresdefault.jpg)](https://youtu.be/TsmCYJWq6Sw)

## Backend - API

1ª - Rodar o comando `yarn` para baixar as bibliotecas do Node.

```
yarn
```

2ª - Rodar o comando `yarn docker` para subir um container Postgres no Docker.

```
yarn docker
```

3ª - Rodar os arquivos de migrations para criar o banco de dados no Postgres.

```
yarn mg:run
```

4ª - Inicializar a aplicação

```
yarn dev:sever
```

---

## Front-end

1ª - Rodar o comando `yarn` para baixar as bibliotecas do Node.

```
yarn
```

2ª - Inicializar a aplicação

```
yarn start
```
