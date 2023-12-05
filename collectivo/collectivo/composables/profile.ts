import { readMe, updateMe } from "@directus/sdk";

class ProfileStore {
  data: CollectivoProfile | null;
  saving: boolean;
  loading: boolean;
  error: any;

  constructor() {
    this.data = null;
    this.saving = false;
    this.loading = false;
    this.error = null;
  }

  async load(force: boolean = false) {
    const { $directus } = useNuxtApp();
    if (!force && this.data) return this;
    this.loading = true;
    this.data = (await $directus?.request(
      readMe({
        fields: ["id", "first_name", "last_name", "email"],
      })
    )) as CollectivoProfile;
    this.loading = false;
    return this;
  }

  async save(data: CollectivoProfile) {
    const { $directus } = useNuxtApp();
    this.saving = true;
    await $directus?.request(updateMe(data));
    this.data = data;
    this.saving = false;
  }
}

export const useProfile = () => {
  const state = useState<ProfileStore>(
    "collectivo_profile",
    () => new ProfileStore()
  );
  return state;
};
