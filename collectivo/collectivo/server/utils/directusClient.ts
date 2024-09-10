import type {
  DirectusClient,
  AuthenticationClient,
  RestClient,
} from "@directus/sdk";
import { createDirectus, authentication, rest } from "@directus/sdk";

// Shared server variable
let directus: DirectusClient<any> & AuthenticationClient<any> & RestClient<any>;

// Refresh Directus client with admin credentials
// TODO: This does not show error messages in the console
export async function refreshDirectus() {
  const config = useRuntimeConfig();

  directus = createDirectus(config.public.directusUrl)
    .with(authentication())
    .with(rest());

  await directus.login(
    config.directusAdminEmail,
    config.directusAdminPassword,
    {},
  );
}

// Return Directus admin client for server plugins
export async function useDirectusAdmin() {
  if (directus === undefined) {
    await refreshDirectus();
  }

  return directus;
}
