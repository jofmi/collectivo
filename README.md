# Collectivo

Collectivo is a modular system for community plattforms.

In development / not ready for production.

## Technologies

Collectivo is based on [Nuxt Layers](https://nuxt.com/docs/guide/going-further/layers), [Directus](https://directus.io/), and [Keycloak](https://www.keycloak.org/).

## Structure

- collectivo - Modular frontend & Nuxt API for migrations
  - app - A container to run collectivo
  - collectivo - Core functionalities
  - extensions - Optional modules
    - memberships - Manage memberships of an organization
- directus - Database, REST/GraphQL API, & Admin app
- keycloak - Authentication

## Installation

Install the following requirements:

- [Docker](https://docs.docker.com/get-docker/)
- [pnpm](https://pnpm.io/installation)

Add the following to your [`etc/hosts`](https://www.howtogeek.com/27350/beginner-geek-how-to-edit-your-hosts-file/) file:

```
127.0.0.1 keycloak
```

Prepare the environment:

```sh
cp .env.example .env
docker compose up -d keycloak
pnpm install
```

Wait for keycloak to be ready, then run:

```sh
docker compose up -d
pnpm dev
```

In a separate terminal, run the following to apply migrations and example data:

```sh
pnpm seed
```

If you go back to the previous terminal (from `pnpm dev`), you will see the migration logs.

The following services should now be available:

- Collectivo/Nuxt (user app): http://localhost:3000/
- Directus (admin app): http://localhost:8055/
- Keycloak (access control): http://localhost:8080/admin/master/console/

You can now log in with the following example users on both the user and admin app:

- Admin: admin@example.com / admin
- Editor: editor@example.com / editor
- User: user@example.com / user

## Migrations

Migrations between schemas can be run via the Nuxt API endpoint `/api/migrate/`. Extensions can define a schema for each version. E.g. a schema can be for version `0.0.1` of the core extension `collectivo`. A migration script can be run both before and after applying each schema version.

![Migration flow](docs/migrations.png)

Migration requests must be authorized with the `NUXT_API_TOKEN` from `.env`.

The following parameters can be passed:

- `extension (string)` - Apply migrations of a specific extension. If not given, all extensions will be migrated.
- `version (string)` - Apply schemas towards specified version. If not given, migration will run up to the latest version.
- `examples (boolean)` - Create example data (default false).
- `isolated (boolean)` - Apply only the specified schema (if version is passed) or example data (if no version passed).

Here is an example to prepare a new system for local development (the same code is run by `pnpm seed`):

```sh
curl --header "Authorization: badToken" --request POST "http://localhost:3000/api/migrate/?examples=true"
```

This cURL command can also imported in an HTTP client like [Postman](https://www.postman.com/).

Migration logs can be found in the nuxt terminal.

## Troubleshooting

- To reset the database, delete the volume of the directus-db database
- To udate dependencies, run `pnpm update -r -L`
- To check packages ready to publich, run `pnpm publish -r --access=public  --dry-run`
- To publish all packages, run `pnpm publish -r --access=public`

## Development guide

### Creating an extension

- Decide on a name for your extension, e.g. `my-extension`.
- Create a fork of this repository
- Create a new extension in `collectivo/extensions/my-extension/`.
  - Option 1: Copy the example from `collectivo/extensions/example/`.
  - Option 2: Create a new [Nuxt Layer](https://nuxt.com/docs/guide/going-further/layers).
- Configure `my-extension/package.json`.
  - Define a package name for your extension. We recommend to start the name with `collectivo` to make it easier to find, e.g. `collectivo-my-extension`.
  - Adding `"@collectivo/collectivo": "workspace:*"` to your dependencies gives you access to the types and functions of collectivo. (see [workspace](#workspace))
- Configure `my-extension/nuxt.config.ts`.
  - To add collectivo, add `extends: ["@collectivo/collectivo"]` (see [Nuxt Layer](https://nuxt.com/docs/guide/going-further/layers)).
- Register your extension on the backend (see [registerExtension](#registerextension))
  - Here, you can set the name of your extension that should be used in the database. The name should not include underscores, e.g. `my-extension` or `myExtension`.
- Create a database schema for your extension (see [initschema](#initschema)).
- Create frontend components for your extension (see [Frontend API](#frontend-api))
- Follow [installation](#installation) to set up a development server that will now include your extension.

### Best practices

- Regularly [sync your fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) with the upstream repository.
- All named elements (database collections and fields as well as frontend components and composables) should start with the extension name to avoid name conflicts with other extensions, e.g. `myExtension_myCollection`, `myExtension_myField`, `myExtensionVueComponent`.
- You can also add fields to collections that are not part of your extensions, like `directus_users`.
- To publish your extension, run `pnpm publish collectivo/extensions/my-extension -r --access=public --dry-run` (remove `--dry-run` after checking that everything is correct)
- The example extension is licensed under [public domain](https://de.wikipedia.org/wiki/Unlicense). You can choose your own license for your extension, it does not have to be the same as collectivo.

### Unit testing

- To run unit tests, use: `pnpm test`

### Linting

- To run linting checks, use: `pnpm lint`
- To apply linting to all files, use: `pnpm lint:fix`

### Formatting

- To run formatting checks, use: `pnpm format`
- To apply formatting to all files, use: `pnpm format:fix`

### Workspace

Collectivo uses a [pnpm workspace](https://pnpm.io/workspaces) to manage multiple packages in a single repository. This allows you to declare dependencies to other packages in the workspace with `package-name: "workspace:*"`. If you publish your package, the workspace `"workspace:*"` will be replaced with the current version of the depedency.

### Theme

Collectivo uses [`tailwindcss`](https://tailwindcss.com/) and [`nuxt-ui`](https://ui.nuxt.com/) for styling and components. The theme can be adapted in `tailwind.config.ts` and `app.config.ts`.

### Auth

Collectivo authenticated through directus. To protect pages, add the following middleware to the setup script.

```ts
definePageMeta({
  middleware: ["auth"],
});
```

### Icons

Collectivo uses [`nuxt-ui`](https://ui.nuxt.com/getting-started/theming#icons) and [`Iconify`](https://iconify.design/) to load icons. They have to be defined as `i-{collection_name}-{icon_name}`.

By default, Collectivo loads the following to icon libraries:

- [System UIcons](https://icones.js.org/collection/system-uicons) for the UI
- [Mono Icons](https://icones.js.org/collection/mi) for form components

Additional libraries can be loaded in `nuxt.config.ts`.

## Frontend API

The following [composables](https://nuxt.com/docs/guide/directory-structure/composables) are available for frontend development.

### `setPageTitle`

`setPageTitle(title: string)`

Use in a page to set a page title for both the visible header and the metadata.

### `useDirectus`

`useDirectus(): DirectusClient`

Access the [directus client](https://docs.directus.io/guides/sdk/getting-started.html) to interact with the database.

### `useUser`

`useUser(): UserStore`

Store for data of the currently authenticated user, with the following attributes:

- `data: CollectivoUser | null`
- `inputs: CollectivoUserInput[]` -> Can be used to add fields to the profile section
- `isAuthenticated: boolean`
- `saving: boolean`
- `loading: boolean`
- `error: unknown`
- `load: (force: boolean = false) => Promise<UserStore>` -> Fetch user data
- `save: (data: CollectivoUser) => Promise<UserStore>` -> Update user data

### `useSidebarMenu`

`useSidebarMenu(): Ref<CollectivoMenuItem[]>`

This composable can be used to add or adapt menu items. Best to use in a plugin as follows:

```ts
// myExtension/plugins/setup.ts
export default defineNuxtPlugin(() => {
  const menu = useSidebarMenu();
  menu.value.push({
    label: "My menu item",
    to: "/my/path",
    icon: "i-system-uicons-cubes",
    order: 100
  });
}
```

## Server API

The following utility functions can be used for server-side scripts (within `/myExtension/server/`)

### `registerExtension`

`registerExtension({name: string, description:string, version:string, schemas:ExtensionSchema[], examples: ()=>Promise<void>})`

Registers a function within the runtime of the backend server, being able to multiple schemas for different versions of the extension as well as a function to create example data.

Should be used within a server plugin as follows:

```ts
// myExtension/server/plugins/registerExtension.ts
import pkg from "../../package.json";
import examples from "../examples/examples";
import mySchema from "../schemas/mySchema";
export default defineNitroPlugin(() => {
  registerExtension({
    name: "myExtension",
    description: pkg.description,
    version: pkg.version,
    schemas: [mySchema],
    examples: examples,
  });
});
```

### `initSchema`

`initSchema(extension: string, version: string, options: ExtensionSchemaOptions)`

Creates a new schema class that can be used to define the database structure and migrations of your extension (see [migrations](#migrations)).

Should be declared as follows and used by [`registerExtension`](#registerextension):

```ts
// myExtension/server/schemas/mySchema.ts
const schema = initSchema("myExtension", "0.0.1");

export default schema;
```

The resulting schema has the following attributes:

- `extension: string`
- `version: string`
- `options: ExtensionSchemaOptions`
- `run_before: () => Promise<void>` -> Custom migration script to be run before applying this schema version
- `run_after: () => Promise<void>` -> Custom migration script to be run after applying this schema version
- `collections: NestedPartial<DirectusCollection<any>>[]`
- `fields: NestedPartial<DirectusField<any>>[]`
- `relations: NestedPartial<DirectusRelation<any>>[]`
- `roles: NestedPartial<DirectusRole<any>>[]`
- `permissions: NestedPartial<DirectusPermission<any>>[]`
- `flows: NestedPartial<DirectusFlow<any>>[]`
- `operations: NestedPartial<DirectusOperation<any>>[]`
- `translations: any[]`

### `useDirectusAdmin`

`useDirectusAdmin(): DirectusClient`

Access the [directus client](https://docs.directus.io/guides/sdk/getting-started.html) with admin access.

### `logger`

You can use winston to write information to the nuxt logs (`console.log` will not appear in production), e.g.:

```ts
logger.info("Hello world!");
```
