import { readMe, updateMe } from "@directus/sdk";
import type { RestClient } from "@directus/sdk";

export const useCollectivoUser = () => {
  const state = useState<CollectivoUserStore>("collectivo_user", () => {
    return new CollectivoUserStore();
  });

  return state;
};

class CollectivoUserStore {
  user: CollectivoUser | null;
  membership: MembershipsMembership | null;
  tags: number[];
  fields: CollectivoFormField[];
  isAuthenticated: boolean;
  saving: boolean;
  loading: boolean;
  error: unknown;

  constructor() {
    this.user = null;
    this.membership = null;
    this.fields = [];
    this.tags = [];
    this.isAuthenticated = false;
    this.saving = false;
    this.loading = false;
    this.error = null;
  }

  async init(directus: RestClient<CollectivoSchema>) {
    this.user = (await directus.request(
      readMe({
        fields: ["*", "role.*", "collectivo_tags.collectivo_tags_id"],
      }),
    )) as CollectivoUser;

    for (const field of this.user.collectivo_tags ?? []) {
      this.tags.push(field.collectivo_tags_id);
    }
  }

  async save(data: CollectivoUser) {
    const { $directus } = useNuxtApp();
    this.saving = true;
    await $directus?.request(updateMe(data));
    this.user = data;
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
