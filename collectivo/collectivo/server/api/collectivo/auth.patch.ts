import { readUser, updateUser } from "@directus/sdk";
import KcAdminClient from "@keycloak/keycloak-admin-client";

async function useKeycloak() {
  const config = useRuntimeConfig();

  const keycloak = new KcAdminClient({
    baseUrl: config.public.keycloakUrl,
    realmName: config.public.keycloakRealm,
  });

  await keycloak.auth({
    grantType: "client_credentials",
    clientId: config.keycloakAdminClient,
    clientSecret: config.keycloakAdminSecret,
  });

  return keycloak;
}

// Update keycloak user
export default defineEventHandler(async (event) => {
  console.log("api/collectivo/auth.path.ts called");

  const config = useRuntimeConfig();

  if (config.public.authService !== "keycloak") {
    return;
  }

  verifyCollectivoApiToken(event);
  const body = await readBody(event);
  const keycloak = await useKeycloak();
  const directus = await useDirectusAdmin();

  const user = await directus.request(
    readUser(body.keys[0], {
      fields: ["id", "email", "provider", "external_identifier"],
    }),
  );

  if (!user || !user.email) {
    throw new Error("User not found");
  }

  if (user.provider !== "keycloak") {
    // Do nothing
    console.log("Do nothing");
    return;
  }

  if (user.email != user.external_identifier) {
    await directus.request(
      updateUser(user.id, { external_identifier: user.email }),
    );
  }

  console.log("directus user found");

  const kc_users = await keycloak.users.find({
    first: 0,
    max: 1,
    email: user.email,
  });

  console.log(kc_users);
  const kc_user = kc_users[0];

  if (!kc_user || !kc_user.id) {
    throw new Error("Keycloak user not found");
  }

  if ("email" in body.payload) {
    await keycloak.users.update(
      { id: kc_user.id },
      {
        username: body.payload.email,
        email: body.payload.email,
        emailVerified: true,
      },
    );
  }

  if ("first_name" in body.payload) {
    await keycloak.users.update(
      { id: kc_user.id },
      {
        firstName: body.payload.first_name,
      },
    );
  }

  if ("last_name" in body.payload) {
    await keycloak.users.update(
      { id: kc_user.id },
      {
        lastName: body.payload.last_name,
      },
    );
  }

  if ("password" in body.payload) {
    await keycloak.users.resetPassword({
      id: kc_user.id,
      credential: {
        temporary: false,
        type: "password",
        value: body.payload.password,
      },
    });
  }
});
