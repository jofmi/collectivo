import { readMe, updateMe } from "@directus/sdk";

class ProfileStore {
  data: CollectivoProfile | null;
  inputs: CollectivoProfileInput[];
  isAuthenticated: boolean;
  saving: boolean;
  loading: boolean;
  error: unknown;

  constructor() {
    this.data = null;
    this.inputs = [];
    this.isAuthenticated = false;
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
      }),
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

export const useUser = () => {
  const state = useState<ProfileStore>(
    "collectivo_profile",
    () => new ProfileStore(),
  );

  return state;
};
