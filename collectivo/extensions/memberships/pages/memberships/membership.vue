<script setup lang="ts">
import { readItems } from "@directus/sdk";

definePageMeta({
  middleware: ["auth"],
});

const { t } = useI18n();
setCollectivoTitle("Mitgliedschaft");
const user = useCollectivoUser();
const directus = useDirectus();
const memberships: Ref<MembershipsMembership[]> = ref([]);
const loaded = ref(false);
const isMember = ref(false);
const membership = ref<MembershipsMembership | null>(null);

async function getMemberships() {
  await user.value.load();

  memberships.value = await directus.request(
    readItems("memberships", {
      fields: ["id", "memberships_status", "memberships_type"],
      filter: {
        memberships_user: {
          _eq: user.value.data?.id,
        },
      },
    }),
  );

  if (memberships.value.length > 0) {
    isMember.value = true;
    membership.value = memberships.value[0];
  }

  loaded.value = true;
}

getMemberships();
</script>

<template>
  <CollectivoContainer v-if="loaded">
    <div v-if="membership" class="flex flex-col">
      <h2>{{ t("Membership details") }}</h2>
      <div>{{ t("Membership number") }}: {{ membership.id }}</div>
      <div>
        {{ t("Membership type") }}:
        {{ t(membership.memberships_type ?? "") }}
      </div>
      <div>
        {{ t("Membership status") }}:
        {{ t(membership.memberships_status ?? "") }}
      </div>
    </div>
    <div v-else>
      {{ t("No memberships found") }}
    </div>
  </CollectivoContainer>
</template>

<i18n lang="json">
{
  "de": {
    "applied": "Beantragt",
    "approved": "Angenommen",
    "ended": "Beendet",
    "No memberships found": "Keine Mitgliedschaften gefunden"
  }
}
</i18n>
