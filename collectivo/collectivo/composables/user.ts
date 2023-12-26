import { readMe, updateMe } from "@directus/sdk";

class CollectivoUserStore {
  data: CollectivoUser | null;
  inputs: CollectivoUserInput[];
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
      })
    )) as CollectivoUser;

    this.loading = false;
    return this;
  }

  async save(data: CollectivoUser) {
    const { $directus } = useNuxtApp();
    this.saving = true;
    await $directus?.request(updateMe(data));
    this.data = data;
    this.saving = false;
    return this;
  }
}

export const useCollectivoUser = () => {
  const state = useState<CollectivoUserStore>(
    "collectivo_profile",
    () => new CollectivoUserStore()
  );

  return state;
};
