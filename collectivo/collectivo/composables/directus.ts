export const useDirectus = () => {
  const { $directus } = useNuxtApp();
  return $directus;
};
