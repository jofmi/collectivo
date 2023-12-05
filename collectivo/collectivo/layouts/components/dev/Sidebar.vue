<script setup lang="ts">
import { ArrowLeftOnRectangleIcon } from "@heroicons/vue/24/outline";
import pkg from "../../../package.json";

const { t, locale } = useI18n();
const appConfig = useAppConfig();
const runtimeConfig = useRuntimeConfig();
const currentUser = useCurrentUser();

const logoutPath = `${runtimeConfig.public.keycloakUrl}/realms/collectivo/protocol/openid-connect/logout`;

// Prepare menu items
const menuItems = useSidebarMenu();

const sortedMenuItems = Object.values(menuItems.value).sort(
  (a, b) => (a.order ?? 100) - (b.order ?? 100),
);
</script>

<template>
  <div
    class="flex items-center px-4 font-bold h-14 border-b-2 border-slate-500"
  >
    {{ appConfig.projectName }}
  </div>
  <div class="p-4 w-full flex flex-col gap-4">
    <div v-for="(item, i) in sortedMenuItems" :key="i">
      <div v-if="!item.filter || item.filter(item)">
        <div v-if="item.external">
          <a :href="item.path" :target="item.target ?? '_blank'">
            <div class="flex flex-row gap-2">
              <component :is="item.icon" class="h-5 w-5" />
              <div>{{ t(item.label) }}</div>
            </div>
          </a>
        </div>
        <div v-else>
          <NuxtLink :to="item.path">
            <div class="flex flex-row gap-2">
              <component :is="item.icon" class="h-5 w-5" />
              <div>{{ t(item.label) }}</div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div>
      <a :href="logoutPath">
        <div class="flex flex-row gap-2">
          <ArrowLeftOnRectangleIcon class="h-5 w-5" />
          <div>{{ t("Logout") }}</div>
        </div>
      </a>
    </div>
    <div>
      Language:
      <form>
        <select v-model="locale">
          <option value="en">en</option>
          <option value="de">de</option>
        </select>
      </form>
    </div>
    <div>Collectivo V2 v{{ pkg.version }}</div>
    <div>Authenticated as {{ currentUser.data?.email }}</div>
  </div>
</template>
