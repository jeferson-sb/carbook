# Carbook

## Project

Carbook is a Node REST API for registering and renting cars

TODO:

- [ ] Refactor controller to be functions
- [ ] Return domain objects from repositories
- [ ] Make License plate its own Value Object

## Quick start

### Installation

```sh
$ cd carbook
$ npm install
```

### Usage

Environment variables

```sh
$ cp .env.example .env
```

Start development server

```sh
$ npm run dev
```

Run migrations

```sh
$ npm run typeorm migration:run
```

## Docker Setup

Start containers

```sh
$ docker-compose up --build
```

Stop containers

```sh
$ docker-compose stop
```

## Tests

```sh
npm run test
```

## Docs

Start the server and open documentation on http://localhost:3333/docs/

```sh
$ npm run dev
```

## Lint

```sh
$ npm run lint
```

```sh
$ npm run lint:fix
```

## License

This project is under the [MIT license](https://github.com/jeferson-sb/carbook/blob/master/LICENSE)
