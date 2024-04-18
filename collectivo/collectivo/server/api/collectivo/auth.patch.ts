import { readUser } from "@directus/sdk";
import KcAdminClient from "@keycloak/keycloak-admin-client";

// Flow script
// module.exports = async function(data) {
//     const attrs = ["email", "password", "first_name", "last_name"]
// 	if (!attrs.some(attr => attr in data["$trigger"].payload)){
//         throw new Error("No important change")
//     }
// 	return {
//     	"allGood": true
//     }
// }

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

// Register a new membership
// Receives input from /memberships/register
export default defineEventHandler(async (event) => {
  console.log("event called");

  verifyCollectivoApiToken(event);
  const body = await readBody(event);
  const keycloak = await useKeycloak();
  const directus = await useDirectusAdmin();

  console.log("event called getting user");
  console.log(body);

  const user = await directus.request(
    readUser(body.keys[0], { fields: ["email"] }),
  );

  if (!user || !user.email) {
    throw new Error("User not found");
  }

  console.log("directus user found");

  const kc_users = await keycloak.users.find({
    first: 0,
    max: 1,
    email: user.email,
  });

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
        emailVerified: false,
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
