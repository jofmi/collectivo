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

## Developing extensions

Setup:

- Create a fork of this repository
- Create a new extension in `collectivo/extensions/my-extension/`.
  - Copy the example from `collectivo/extensions/example/`.
  - Create a new [Nuxt Layer](https://nuxt.com/docs/guide/going-further/layers).
- Adapt the name and configuration in `collectivo/extensions/my-extension/package.json`. This will be used by package managers. We recommend to start the package name with `collectivo-` to make it easier for others to find collectivo extensions, e.g. `collectivo-my-extension`.
- Add the name of your package to `collectivo/app/package.json` and `collectivo/app/nuxt.config.ts`.
- Adapt the name and configuration in `my-extension/server/plugins/registerExtension.ts`. This will be used by collectivo. The name should not include dashes or underscores, e.g. `myExtension`.
- Run `pnpm i` to install the extension as a workspace package.
- Run `pnpm dev` to run a development system that includes your extension.

Tipps and recommendations:

- Regularly [sync your fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) with the upstream repository.
- Migrations can be created with `createMigration()` and registered in `my-extension/server/plugins/registerExtension.ts`.
  - Utility functions can be found in `collectivo/collectivo/server/utils`.
  - All collections and fields should start with `myExtension_` to avoid name conflicts with other extensions.
- Frontend components and pages can be defined under `my-extension/components` and ``my-extension/pages`. To avoid name conflicts with other extensions, they should also be prefixed with the extension name.
- Adding `"@collectivo/collectivo": "workspace:*"` to your dependencies in `package.json` gives you access to the types and functions of collectivo.
- To publish your extension, run `pnpm publish collectivo/extensions/my-extension -r --access=public --dry-run` (remove --dry-run after checking that everything is correct)
- The example extension is licensed under [public domain](https://de.wikipedia.org/wiki/Unlicense). You can choose your own license for your extension, it does not have to be the same as collectivo.
