import { readItems } from "@directus/sdk";

export const useExtensions = () =>
  useState<CollectivoExtension[] | null>("collectivo_extensions", () => null);

export const getExtensions = async () => {
  const { $directus } = useNuxtApp();
  const extensions = useExtensions();
  extensions.value =
    (await $directus?.request(readItems("collectivo_extensions"))) || null;
  return extensions;
};
