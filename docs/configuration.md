# Installation & configuration

This guide is for administrators who want to install, configure, and publish a Collectivo platform for their community.

## Local installation

The following steps show you how to set up your own local instance of Collectivo.

Install the following requirements:

-   [git](https://git-scm.com/downloads)
-   [Docker](https://docs.docker.com/get-docker/)
-   [pnpm](https://pnpm.io/installation)

Add the following to your `etc/hosts` file ([here is a guide](https://www.howtogeek.com/27350/beginner-geek-how-to-edit-your-hosts-file/)).

```title="etc/hosts"
127.0.0.1 keycloak
```

Clone the quickstart repository (or start your own repository by [creating a fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo)).

```shell
git clone https://github.com/collectivo-dev/collectivo-quickstart.git
```

Move into your new project folder.

```bash
cd collectivo-quickstart
```

Create an environment file.

```bash
cp .env.example .env
```

Build docker containers.

```
docker compose build
```

Start docker containers.

```
docker compose up -d
```

Install npm packages.

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

-   Collectivo (user app): http://localhost:3000/
-   Directus (data studio): http://localhost:8055/
-   Keycloak (access control): http://localhost:8080/admin/master/console/

Log in with the following example users:

-   Admin: admin@example.com / admin (Collectivo, Directus, Keycloak)
-   Editor: editor@example.com / editor (Collectivo, Directus)
-   User: user@example.com / user (Collectivo)

## Configuration

The main settings of Collectivo can be configured in `collectivo/app.config.ts`.

The following settings can be configured in `collectivo/nuxt.config.ts`.

-   Internationalization (see [nuxt/i18n](https://i18n.nuxtjs.org/))
    -   Change the default language: add `i18n: {defaultLocale: 'en'}` to `nuxt.config.ts`.

## Add an extension

To add an extension to Collectivo, add the name of the package in `package.json` and `nuxt.config.ts`. For more information, see [Nuxt Layers](https://nuxt.com/docs/guide/going-further/layers).

## Develop custom features

You can adapt Collectivo to add your own custom functionality. See [development](development.md) for more information.

## Deploy to a server

To deploy Collectivo on a server, make sure to generate a new client secret in Keycloak and set fresh secrets in `.env`.

To setup a docker container for Collectivo, uncomment the template provided in `docker-compose.yml`.

You further need to set up a reverse proxy system and SSH certificates to make your instance of Collectivo publicly accessible.

A working example of a deployment setup using [nginxproxymanager](https://nginxproxymanager.com/) can be found in [mila-server](https://github.com/MILA-Wien/mila-server).

For further options on how to deploy a Nuxt app, see [Nuxt Deployment](https://nuxt.com/docs/getting-started/deployment).

## Installing updates

To keep your system up-to-date, you have to update the packages in `collectivo/package.json` and the services in `docker-compose.yml` to the latest versions and then re-build all containers. Make sure to create a backup before installing updates.

Notes:

-   To update javascript dependencies, run `pnpm update collectivo -L`
-   For Docker, see the latest versions of [Directus](https://hub.docker.com/r/directus/directus/tags) and [Keycloak ](https://quay.io/repository/keycloak/keycloak?tab=tags)
-   The Keycloak version is set in `keycloak/Dockerfile`
