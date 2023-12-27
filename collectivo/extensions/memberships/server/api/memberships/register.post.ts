import { createItem, createUser } from "@directus/sdk";
import KcAdminClient from "@keycloak/keycloak-admin-client";

// Register a new membership
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    return await registerMembership(body);
  } catch (e) {
    logger.error(e);
    throw e;
  }
});

async function registerMembership(body: any) {
  logger.info(
    "Received membership application: " + body["directus_users.email"]
  );

  const userData: any = {};
  const membershipData: any = {};

  for (const [key, value] of Object.entries(body)) {
    if (key.startsWith("directus_users.")) {
      userData[key.replace("directus_users.", "")] = value;
    } else if (key.startsWith("memberships.")) {
      membershipData[key.replace("memberships.", "")] = value;
    }
  }

  await refreshDirectus();
  const directus = await useDirectusAdmin();
  const config = useRuntimeConfig();

  console.log(config);

  // Connect to keycloak
  const keycloak = new KcAdminClient({
    baseUrl: config.public.keycloakUrl,
    realmName: config.public.keycloakRealm,
  });

  await keycloak.auth({
    grantType: "client_credentials",
    clientId: config.keycloakAdminClient,
    clientSecret: config.keycloakAdminSecret,
  });

  // TODO: Finish keycloak process
  const users = await keycloak.users.find({ first: 0, max: 10 });
  console.log(users);
  // await keycloak.users.create({
  //   realm: "collectivo",
  //   // enabled: true,
  //   username: userData.email,
  //   email: userData.email,
  //   // firstName: userData.first_name,
  //   // lastName: userData.last_name,
  // });

  return;

  // Create user
  const password = userData.password;
  delete userData.password;
  userData.provider = "keycloak";
  userData.external_identifier = userData.email;
  const user_id = await directus.request(createUser(userData));

  // Prepare membership
  membershipData.memberships_user = user_id;
  membershipData.memberships_status = "applied";
  membershipData.memberships_date_applied = new Date().toISOString();

  // Create membership
  await directus.request(createItem("memberships", membershipData));

  // Create keycloak user

  // Send verification email

  return {
    status: 200,
    body: {
      message: "Membership registered",
    },
  };
}
