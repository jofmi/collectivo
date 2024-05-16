import { readMe, updateMe } from "@directus/sdk";

export const useCollectivoUser = () => {
  const state = useState<CollectivoUserStore>(
    "collectivo_user",
    () => new CollectivoUserStore(),
  );

  return state;
};

class CollectivoUserStore {
  data: CollectivoUser | null;
  fields: CollectivoFormField[];
  tags: number[];
  isAuthenticated: boolean;
  saving: boolean;
  loading: boolean;
  error: unknown;

  constructor() {
    this.data = null;
    this.fields = [];
    this.tags = [];
    this.isAuthenticated = false;
    this.saving = false;
    this.loading = false;
    this.error = null;
  }

  async load(force: boolean = false) {
    const directus = useDirectus();
    if (!force && this.data) return this;
    this.loading = true;

    this.data = (await directus.request(
      readMe({
        fields: ["*", "role.*", "collectivo_tags.collectivo_tags_id"],
      }),
    )) as CollectivoUser;

    this.tags = [];
    for (const field of this.data.collectivo_tags ?? []) {
      this.tags.push(field.collectivo_tags_id);
    }
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

  async login(force: boolean = false) {
    const user = useCollectivoUser();
    if (user.value.isAuthenticated === true && !force) return;
    return navigateTo("/login");
  }

  async logout() {
    return navigateTo("/logout");
  }
}
