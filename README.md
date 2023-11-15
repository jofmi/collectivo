# Collectivo

Collectivo is a modular system for community plattforms.

In development / not ready for production.

## Technologies

Collectivo is based on [Nuxt Layers](https://nuxt.com/docs/guide/going-further/layers), [Directus](https://directus.io/), and [Keycloak](https://www.keycloak.org/).

## Structure

- collectivo - Modular frontend & Nuxt API for migrations
  - app - A development app
  - collectivo - Core functionalities
  - extensions - Optional modules
- directus - Database, REST/GraphQL API, & Admin app
- keycloak - Authentication

## Installation

Install the following requirements:

- [Docker](https://docs.docker.com/get-docker/)
- [pnpm](https://pnpm.io/installation)

Add the following to your `etc/hosts` file:

```
127.0.0.1 keycloak
```

Prepare the environment:

```
cp .env.example .env
docker compose up -d keycloak
pnpm install
```

Wait for keycloak to be ready, then run:

```
docker compose up -d
pnpm dev
```

The following services should now be available:

- Collectivo/Nuxt: http://localhost:3000/
- Directus: http://localhost:8055/
- Keycloak: http://localhost:8080/

Apply migrations & create example data as follows:

```
curl \
  --header "Authorization: badToken" \
  --request POST \
  http://localhost:3000/api/migrate/?all=true?exampleData=true
```

You can now log in with the following example users:

- Admin: admin@example.com / admin
- Editor: editor@example.com / editor
- User: user@example.com / user

## Migrations

Migrations can be run via the Nuxt API endpoint `/api/migrate/`.

Requests must be authorized with the `NUXT_API_TOKEN` from `.env`.

The following optional parameters can be passed:

- all (boolean) - Apply migrations of all extensions
- exampleData (boolean) - Apply example data after migrations
- extension (string) - Apply migrations of a specific extension
  - version (string) - Apply migrations up or down towards specified version
  - force (boolean) - Apply only the migration up of the specified version
    - down (boolean) - Apply the forced migration down instead of up

Example to prepare a new system for local development:

```
curl \
  --header "Authorization: badToken" \
  --request POST \
  http://localhost:3000/api/migrate/?all=true?exampleData=true
```

To perform migrations, we recommend using a http client like postman or thunder client.

## Unit testing

- To run unit tests, use: `pnpm test`

## Troubleshooting

- To reset the database, run
  - drop table
  - `docker compose restart directus directus-cache directus-db`
- Udate dependencies `pnpm update -r -L`
- Publish all packages (remove --dry-run) `pnpm publish -r --access=public --dry-run`

## Creating a new extension

- Create a new [Nuxt Layer](https://nuxt.com/docs/guide/going-further/layers)
- Register the extension in `my-extension/server/plugins/registerExtension.ts`
- Add the extension to `package.json` and `nuxt.config.ts` of your app
- All collections and fields should start with `extensionName_` to avoid name conflicts.
