import type {
  DirectusClient,
  StaticTokenClient,
  RestClient,
} from "@directus/sdk";
import { createDirectus, staticToken, rest } from "@directus/sdk";

// Shared server variable
let directus: DirectusClient<any> & StaticTokenClient<any> & RestClient<any>;

// Return Directus admin client for server plugins
export async function useDirectusAdmin() {
  const config = useRuntimeConfig();

  directus = createDirectus(config.public.directusUrl)
    .with(staticToken(config.directusAdminToken))
    .with(rest());

  return directus;
}
