import { readItem, readUser } from "@directus/sdk";
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

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  console.log("Syncing tags");

  if (config.public.authService !== "keycloak") {
    return;
  }

  try {
    await refreshDirectus();
  } catch (e) {
    logger.error("Failed to connect to Directus", e);
  }

  verifyCollectivoApiToken(event);
  const body = await readBody(event);
  const isCreate = body.event === "collectivo_tags_directus_users.items.create";
  const isDelete = body.event === "collectivo_tags_directus_users.items.delete";

  body.keys = body.keys || [body.key];

  if (isCreate) {
    assignRole(body);
  } else if (isDelete) {
    for (const key of body.payload) {
      await assignRole(body, key);
    }
  } else {
    throw new Error("Tag relation event can only be create or delete");
  }
});

async function assignRole(body: any, deleteKey?: any) {
  const keycloak = await useKeycloak();
  const directus = await useDirectusAdmin();
  let tagID = "";
  let userID = "";
  if (deleteKey) {
    const tagRelation = await directus.request(
      readItem("collectivo_tags_directus_users", deleteKey),
    );
    tagID = tagRelation.collectivo_tags_id;
    userID = tagRelation.directus_users_id;
  } else {
    userID =
      body.payload.directus_users_id.id ?? body.payload.directus_users_id;
    tagID =
      body.payload.collectivo_tags_id.id ?? body.payload.collectivo_tags_id;
  }

  if (!tagID || !userID) {
    return;
  }

  const tag = await directus.request(
    readItem("collectivo_tags", tagID, {
      fields: ["tags_name", "tags_sync"],
    }),
  );
  console.log("Tag", tag);

  if (!tag.tags_sync) {
    return;
  }

  const user = await directus.request(
    readUser(userID, {
      fields: ["external_identifier"],
    }),
  );

  const email = user.external_identifier;

  if (!email) {
    return;
  }

  const roleName = tag.tags_name.toLowerCase().replace(/ /g, "-");

  let role: any = await keycloak.roles.findOneByName({ name: roleName });

  if (!role) {
    console.log("Creating role", roleName);
    await keycloak.roles.create({ name: roleName });
    role = await keycloak.roles.findOneByName({ name: roleName });
  }

  let kc_user_id = null;

  const kc_users = await keycloak.users.find({
    first: 0,
    max: 1,
    email: email,
  });

  if (kc_users && kc_users.length > 0) {
    kc_user_id = kc_users[0].id;
  }

  if (!kc_user_id) {
    return;
  }

  if (deleteKey) {
    keycloak.users.delRealmRoleMappings({
      id: kc_user_id,
      roles: [{ id: role.id, name: role.name }],
    });
  } else {
    await keycloak.users.addRealmRoleMappings({
      id: kc_user_id,
      roles: [{ id: role.id, name: role.name }],
    });
  }
}
