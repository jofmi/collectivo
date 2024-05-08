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
  const config = useRuntimeConfig();

  if (config.public.authService !== "keycloak") {
    return;
  }

  verifyCollectivoApiToken(event);
  const body = await readBody(event);
  const keycloak = await useKeycloak();
  const directus = await useDirectusAdmin();
  const isCreate = body.event === "users.create";
  const isDelete = body.event === "users.delete";

  let user: any = {};
  body.keys = body.keys || [body.key];

  if (isDelete) {
    body.keys = body.payload;
  }

  for (const key of body.keys) {
    // Get existing user
    // Error if user does not exist or has no email (deletion is still allowed)
    if (!isCreate) {
      user = await directus.request(
        readUser(key, {
          fields: ["id", "email", "provider", "external_identifier"],
        }),
      );

      if (!user || !user.email) {
        if (isDelete) {
          return;
        }

        throw new Error("User not found");
      }
    }

    const email = body.payload.email || user.email;
    let provider = body.payload.provider || user.provider;
    let extid = body.payload.external_identifier || user.external_identifier;

    // If new user is created, set provider to keycloak
    if (isCreate) {
      provider = "keycloak";
      extid = email;
    }

    // If user is not connected to keycloak, do not sync
    if (provider !== "keycloak") {
      return;
    }

    // Set external identifier to match email
    if (email != extid) {
      await directus.request(
        updateUser(user.id, { external_identifier: user.email }),
      );
    }

    // Find or create keycloak user
    // Email has to be verified by user
    let kc_user_id = null;

    if (!isCreate) {
      const kc_users = await keycloak.users.find({
        first: 0,
        max: 1,
        email: user.email,
      });

      if (kc_users && kc_users.length > 0) {
        kc_user_id = kc_users[0].id;
      }

      if (kc_user_id && isDelete) {
        await keycloak.users.del({ id: kc_user_id });
      }
    }

    if (!kc_user_id) {
      const kc_user = await keycloak.users.create({
        email: email,
        emailVerified: false,
        username: email,
        enabled: true,
      });

      kc_user_id = kc_user.id;
    }

    // Update keycloak user
    if ("email" in body.payload && body.payload.email !== user.email) {
      await keycloak.users.update(
        { id: kc_user_id },
        {
          username: body.payload.email,
          email: body.payload.email,
          emailVerified: false,
        },
      );
    }

    if ("first_name" in body.payload) {
      await keycloak.users.update(
        { id: kc_user_id },
        {
          firstName: body.payload.first_name,
        },
      );
    }

    if ("last_name" in body.payload) {
      await keycloak.users.update(
        { id: kc_user_id },
        {
          lastName: body.payload.last_name,
        },
      );
    }

    if ("password" in body.payload && body.payload.password) {
      await keycloak.users.resetPassword({
        id: kc_user_id,
        credential: {
          temporary: false,
          type: "password",
          value: body.payload.password,
        },
      });
    }
  }
});
