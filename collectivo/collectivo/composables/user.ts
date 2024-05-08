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
  isAuthenticated: boolean;
  saving: boolean;
  loading: boolean;
  error: unknown;

  constructor() {
    this.data = null;
    this.fields = [];
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
        fields: ["*", "role.*"],
      }),
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

  async login(force: boolean = false) {
    const user = useCollectivoUser();
    if (user.value.isAuthenticated === true && !force) return;
    return navigateTo("/login");
  }

  async logout() {
    return navigateTo("/logout");
  }
}
