import { defineOperationApi } from '@directus/extensions-sdk';
import KcAdminClient from '@keycloak/keycloak-admin-client';

type Options = {
	text: string;
};

type Response = {
	keycloak_uuid?: string;
};

export default defineOperationApi<Options>({
	id: 'keycloak_sync',
	handler: async ({ text }, context) => {

		// check if we have all the data we need
		if (!context.data.read_user_data) {
			console.log("No user data");
			throw new Error("No user data");
		}
		if (!context.data.read_user_data.email) {
			console.log("No user email");
			throw new Error("No user email");
		}
		if (!context.env.AUTH_KEYCLOAK_URL) {
			console.log("No keycloak url");
			throw new Error("No keycloak url");
		}
		if (!context.env.AUTH_KEYCLOAK_REALM) {
			console.log("No keycloak realm");
			throw new Error("No keycloak realm");
		}
		if (!context.env.AUTH_KEYCLOAK_CLIENT_ID) {
			console.log("No keycloak client id");
			throw new Error("No keycloak client id");
		}
		if (!context.env.AUTH_KEYCLOAK_CLIENT_SECRET) {
			console.log("No keycloak secret");
			throw new Error("No keycloak secret");
		}
		const user = context.data.read_user_data;

		const keycloak = new KcAdminClient({
			baseUrl: context.env.AUTH_KEYCLOAK_URL,
			realmName: context.env.AUTH_KEYCLOAK_REALM,
		});
		let response: Response = {};
		try {
			await keycloak.auth({
				grantType: "client_credentials",
				clientId: context.env.AUTH_KEYCLOAK_CLIENT_ID,
				clientSecret: context.env.AUTH_KEYCLOAK_CLIENT_SECRET,
			});
			// check if user exists
			let new_user = false;
			if (!user.keycloak_uuid) {
				const keycloak_user = await keycloak.users.findOne({ email: user.email });

				if (keycloak_user && keycloak_user.length > 0) {
					response["keycloak_uuid"] = keycloak_user[0].id;
				} else {
					console.log("No keycloak user, lets create one", user.email);
					const keycloak_user = await keycloak.users.create({
						email: user.email,
						username: user.email,
						firstName: user.first_name,
						lastName: user.last_name,
						enabled: true,
					});
					new_user = true;
					if (keycloak_user) {
						response["keycloak_uuid"] = keycloak_user.id;
					}
				}
			}
			

			// Check if keycloak user is up to date
			if(!new_user) {
				//compare user data
				const keycloak_user = await keycloak.users.findOne({ id: user.keycloak_uuid });
				if (keycloak_user) {
					if (keycloak_user.email !== user.email || keycloak_user.firstName !== user.first_name || keycloak_user.lastName !== user.last_name) {
						console.log("User email changed, lets update it");
						let newData = {
							email: user.email,
							username: user.email,
							firstName: user.first_name,
							lastName: user.last_name,
							enabled: true,
						};
						if (keycloak_user.email !== user.email){
							// email changed, lets set it to unverified
							newData["emailVerified"] = false;
						}

						await keycloak.users.update({ id: user.keycloak_uuid }, newData);
					}
				}
			}

			// update user tags and roles
			if (user.keycloak_uuid || response["keycloak_uuid"]) {
				const keycloak_user = await keycloak.users.findOne({ id: user.keycloak_uuid });
				if (keycloak_user) {
					const keycloak_user_groups = await keycloak.users.listGroups({ id: user.keycloak_uuid });
					// map directus tag id to name
					const user_tags_names = user.collectivo_tags.map((id) => context.data.user_tags.find((tag) => tag.id === id)?.name.replace(/ /g, "_").toLowerCase());
					const user_roles_name = context.data.user_roles.find((role) => role.id === user.role)?.name.replace(/ /g, "_").toLowerCase();
					// combine to one list 
					const full_groups_list = [...user_tags_names, user_roles_name];


					if (keycloak_user_groups) {
						const keycloak_user_group_names = keycloak_user_groups.map((group) => group.name);
						// console.log("keycloak_user_group_names", JSON.stringify(keycloak_user_group_names));
						const keycloak_user_group_ids_to_remove = keycloak_user_group_names.filter((name) => !full_groups_list.includes(name));
						// console.log("keycloak_user_group_ids_to_remove", JSON.stringify(keycloak_user_group_ids_to_remove));
						const keycloak_user_group_ids_to_add = full_groups_list.filter((name) => !keycloak_user_group_names.includes(name));
						// console.log("keycloak_user_group_ids_to_add", JSON.stringify(keycloak_user_group_ids_to_add));
						for (const id of keycloak_user_group_ids_to_remove) {
							console.log(`Remove user ${user.email} from group ${id}`);
							await keycloak.users.delFromGroup({ id: user.keycloak_uuid, groupId: id });
						}
						let keycloak_groups = await keycloak.groups.find();
						for (const groupName of keycloak_user_group_ids_to_add) {
							console.log(`Add user ${user.email} to group ${groupName}`);
							// check if group exists
							let keycloak_group = keycloak_groups.find((group) => group.name === groupName);
							if (keycloak_group === undefined) {
								console.log("No keycloak group, lets create one ", groupName);
								await keycloak.groups.create({
									name: groupName,
									path: "/" + groupName,
								});
								keycloak_groups = await keycloak.groups.find();
								keycloak_group = keycloak_groups.find((group) => group.name === groupName);
							}
							if (keycloak_group === undefined) {
								console.log("failed to create keycloak group", groupName)
							} else {
								await keycloak.users.addToGroup({ id: user.keycloak_uuid, groupId: keycloak_group.id });
							}
						}
					}
				}
			}
			

		} catch (error) {
			console.log("error", error);
			// make sure that nothing happens when keycloak is not available
			return {};
		}
		// when response contains a keycloak id, we need to update the user, this done in the after hook
		return response
	},
});
