# Getting started

This guide shows you how to set up your own local instance of [Collectivo](https://github.com/collectivo-dev/collectivo).

Install the following requirements:

- [git](https://git-scm.com/downloads)
- [Docker](https://docs.docker.com/get-docker/)
- [pnpm](https://pnpm.io/installation)

Add the following to your [`etc/hosts`](https://www.howtogeek.com/27350/beginner-geek-how-to-edit-your-hosts-file/) file. This is necessary for keycloak to work in a local docker network.

```title="etc/hosts"
127.0.0.1 keycloak
```

Clone this repository.

```shell
git clone https://github.com/collectivo-dev/collectivo-quickstart.git
```

Move into your new project folder.

```bash
cd collectivo-quickstart
```

Create an environment file where you can define secret variables.

```bash
cp .env.example .env
```

Build all docker containers.

```
docker compose build
```

Start all docker containers.

```
docker compose up -d
```

Install all npm packages.

```sh
pnpm i
```

Start a development server for Collectivo.

```sh
pnpm dev
```

While Collectivo is running, in a separate terminal, apply migrations and example data.

```sh
pnpm seed
```

Go back to the previous terminal to see the migration logs.

The following services should now be available:

- Collectivo (user app): http://localhost:3000/
- Directus (data studio): http://localhost:8055/
- Keycloak (access control): http://localhost:8080/admin/master/console/

Log in with the following example users:

- Admin: admin@example.com / admin (Collectivo, Directus, Keycloak)
- Editor: editor@example.com / editor (Collectivo, Directus)
- User: user@example.com / user (Collectivo)
