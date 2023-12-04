import { readMe } from "@directus/sdk";

export const useProfile = (load: boolean = false, force: boolean = false) => {
  const state = useState<DataWrapper<CollectivoProfile>>(
    "collectivo_profile",
    () => initData(loadProfile)
  );
  if (load) loadProfile(state, force);
  return state;
};

const loadProfile = async (
  profile: Ref<DataWrapper<CollectivoProfile>>,
  force: boolean = false
) => {
  const { $directus } = useNuxtApp();
  if (!force && profile.value.data) return profile;
  profile.value.loading = true;
  profile.value.data = (await $directus?.request(
    readMe({
      fields: ["id", "first_name", "last_name", "email"],
    })
  )) as CollectivoProfile;
  profile.value.loading = false;
  return profile;
};
