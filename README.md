# COLLECTIVO

Collectivo is an open-source template for community platforms, using on Directus, Nuxt, and Keycloak.

## Local setup

- Install Docker and PNPM
- Clone this repository
- Create .env file with `cp .env.example .env`
- Create a network `docker network create proxiable`
- Run `docker compose up -d keycloak keycloak-db`
- When keycloak is running, run `docker compose up -d`
- Log in at http://localhost:8055 with `api@example.com` and `d1r3ctu5`
- Install the [directus-sync](https://www.npmjs.com/package/directus-extension-sync) extension
- Apply schema with `npx directus-sync push`
- Install packages with `pnpm i`
- Start dev server with `pnpm dev`
- Create example data with `pnpm seed` (run in a separate terminal while `pnpm dev` is running, sometimes it needs to be run twice)
- Go to http://localhost:3000 and http://localhost:8055

## Production setup

- Install Docker and PNPM
- [Set up a reverse proxy](https://www.linode.com/docs/guides/using-nginx-proxy-manager/) with a docker network called `proxiable`
- Set the following [custom Nginx configuration](https://stackoverflow.com/questions/56126864) for Keycloak
  ```
  proxy_buffer_size   128k;
  proxy_buffers   4 256k;
  proxy_busy_buffers_size   256k;
  ```
- Clone this repository
- Run `pnpm i` and `pnpm build`
- Run `docker compose up -d`
- Apply database schema (see below)

## Change database schemas

Collectivo uses [directus-sync](https://github.com/tractr/directus-sync) for changes in the database schema.

- Make changes to the database schema on your local system
- Run `npx directus-sync pull` to update the database schema in the repository
- Make a database backup of the production system (see below)
- Run `npx directus-sync push -u "<URL>" -e "<EMAIL>" -p "<PASSWORD>"` to apply the new database schema to the production system
