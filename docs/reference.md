# API reference

## Frontend

The following [composables](https://nuxt.com/docs/guide/directory-structure/composables) are available for frontend development.

### `setCollectivoTitle`

`setCollectivoTitle(title: string)`

Use in a page to set a page title for both the visible header and the metadata.

### `useDirectus`

`useDirectus(): DirectusClient`

Access the [directus client](https://docs.directus.io/guides/sdk/getting-started.html) to interact with the database.

### `useCollectivoUser`

`useCollectivoUser(): UserStore`

Store for data of the currently authenticated user, with the following attributes:

-   `data: CollectivoUser | null`
-   `inputs: CollectivoUserInput[]` -> Can be used to add fields to the profile section
-   `isAuthenticated: boolean`
-   `saving: boolean`
-   `loading: boolean`
-   `error: unknown`
-   `load: (force: boolean = false) => Promise<UserStore>` -> Fetch user data
-   `save: (data: CollectivoUser) => Promise<UserStore>` -> Update user data

### `useCollectivoMenus`

`useCollectivoMenus(): Ref<CollectivoMenus>`

This composable can be used to add or adapt menu items.

There are two menus in `CollectivoMenus`:

-   `main`: Shown for authenticated users.
-   `public`: Shown for unauthenticated users.

Attributes:

-   `label: string` - Will be shown next to the icon.
-   `icon: string` - Icon to be used (see [icons](#icons))
-   `to: string` - A path like `/my/path` or `https://externallink.com`
-   `external: boolan` - If true, path will be interepreted as an external URL.
-   `hideOnMobile: boolean` - If true, item will not be shown on small screens.
-   `target: string` - Target attribute of the link.
-   `click: Function` - Click attribute of the link.
-   `filter: (item: CollectivoMenuItem) => boolean` - Show item only if this function returns `true`.

### `CollectivoFormBuilder`

This component can be used to build forms.

Attributes:

-   `data: Record<string, any>`: Data to populate the initial form
-   `fields: CollectivoFormField[]`: Defines the structure of the form
-   `submit: (data: Record<string, any>) => Promise<void>`: Function to be called when form is submitted
-   `submit-label: string`: Label of the submit button

To see the different possible form fields, check out the available types of `CollectivoFormField` in `index.d.ts`.

## Backend

The following utility functions can be used for server-side scripts (within `/my-extension/server/`)

### `registerExtension`

`registerExtension({name: string, description:string, version:string, schemas:ExtensionSchema[], examples: ()=>Promise<void>})`

Registers a function within the runtime of the backend server, being able to multiple schemas for different versions of the extension as well as a function to create example data.

### `initSchema`

`initSchema(extension: string, version: string, options: ExtensionSchemaOptions): ExtensionSchema`

Initiates a new [ExtensionSchema](#extensionschema) that can be used to define the database structure and migrations of your extension (see [migrations](development.md#migrations)). Can be applied as follows and added to [`registerExtension`](#registerextension).

### `ExtensionSchema`

This class has the following attributes:

-   `extension`: String. Name of the extension.
-   `version`: String. The [semantic version](https://semver.org/) of the extension that this schema represents.
-   `dependencies`: Array of [`ExtensionDependency`]().
-   `run_before`: Async function. Custom migration script to be run before applying this schema version
-   `run_after`: Async function. Custom migration script to be run after applying this schema version
-   `collections`: Array of [`DirectusCollection`](https://docs.directus.io/reference/system/collections.html).
-   `fields`: Array of [`DirectusField`](https://docs.directus.io/reference/system/fields.html).
-   `relations`: Array of [`DirectusRelation`](https://docs.directus.io/reference/system/relations.html). See also the methods below.
-   `roles`: Array of [`DirectusRole`](https://docs.directus.io/reference/system/roles.html).
-   `permissions`: Array of [`DirectusPermission`](https://docs.directus.io/reference/system/permissions.html).
-   `flows`: Array of [`DirectusFlowWrapper`](#directusflowwrapper). Define automated workflows.
-   `translations`: Array of [`DirectusTranslation`](https://docs.directus.io/reference/system/translations.html)

And the following methods:

-   `createO2MRelation()` - Utility method to create a [One-to-Many](https://docs.directus.io/app/data-model/relationships.html#one-to-many-o2m) relationship
-   `createM2MRelation()` - Utility method to create a [Many-to_many](https://docs.directus.io/app/data-model/relationships.html#many-to-many-m2m) relationship
-   `createM2ARelation()` - Utility method to create a [Many-to-Any](https://docs.directus.io/app/data-model/relationships.html#many-to-any-m2a) relationship
-   `createNuxtHook()` - Utility method to create a flow that will send a post request to a Nuxt API endpoint when it is triggered.

### `ExtensionDependency`

This type can be used to define dependencies of a schema on another extension.

Attributes:

-   `extension`: String. The extension that the schema depends on.
-   `version`: String. The [semantic version](https://semver.org/) of the extension that the schema depends on.

### `DirectusFlowWrapper`

This type can be used to construct directus flows in a schema.

Attributes:

-   `flow: Partial<DirectusFlow<<any>>` - this will define the trigger, see [directus flow](https://docs.directus.io/reference/system/flows.html)
-   `firstOperation: string` - key of the initial operation to be performed
-   `operations: DirectusOperationWrapper[]` - define a list of connected operations

### `DirectusOperationWrapper`

This type can be used to define operations within [DirectusFlowWrapper](#directusflowwrapper).

Attributes:

-   `operation: Partial<DirectusOperation<<any>>` - see [directus operation](https://docs.directus.io/reference/system/operations.html)
-   `resolve: string` - key of the operation to execute when this one is resolved
-   `reject: string` - key of the operation to execute when this one is rejected

### `useDirectusAdmin`

`useDirectusAdmin(): DirectusClient`

Access the [directus client](https://docs.directus.io/guides/sdk/getting-started.html) with admin access.

### `logger`

You can use winston to write information to the nuxt logs (`console.log` will not appear in production), e.g.:

```ts
logger.info("Hello world!");
```
