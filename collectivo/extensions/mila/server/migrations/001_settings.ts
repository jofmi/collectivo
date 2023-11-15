import {
  DirectusCollection,
  DirectusField,
  NestedPartial,
  createTranslation,
  updateMe,
} from "@directus/sdk";

const migration = {
  id: 1,
  name: "001_settings",
  up: up,
  down: down,
};

export default migration;

async function down() {}

async function up() {
  const directus = await useDirectus();

  // Set admin language to German
  try {
    directus.request(updateMe({ language: "de-DE" }));
  } catch (error) {
    console.log(error);
  }
}
