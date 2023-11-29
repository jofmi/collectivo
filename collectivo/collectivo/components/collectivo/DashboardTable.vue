<script setup>
import avatar1 from "@/assets/images/table-avatar-1.png";
import avatar2 from "@/assets/images/table-avatar-2.png";
import { Icon } from "@iconify/vue";

const columns = [
  {
    key: "name",
    label: "Customer Name",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "created_date",
    label: "Created Date",
  },
  {
    key: "revenue",
    label: "Revenue",
  },
  {
    key: "plan_status",
    label: "Plan Status",
  },
  {
    key: "country",
    label: "Country",
  },
  {
    key: "action",
    label: "Action",
  },
];

const rows = [
  {
    name: "Shaun Anderson",
    image: avatar1,
    email: "shaunanderson@gmail.com",
    created_date: "25/05/2023",
    revenue: "$520.00",
    plan_status: "active",
    country: "United States",
  },
  {
    name: "Peter Roy Johnson",
    image: avatar2,
    email: "peterroyjhon@gmail.com",
    created_date: "25/05/2023",
    revenue: "$520.00",
    plan_status: "inactive",
    country: "United States",
  },
  {
    name: "Ricky PontingY",
    image: avatar1,
    email: "rickyponting @gmail.com",
    created_date: "25/05/2023",
    revenue: "$520.00",
    plan_status: "inactive",
    country: "United States",
  },
  {
    name: "Adam Forchester",
    image: avatar2,
    email: "adamforchester@gmail.com",
    created_date: "25/05/2023",
    revenue: "$520.00",
    plan_status: "active",
    country: "United States",
  },
  {
    name: "Marvin McKinney",
    image: avatar1,
    email: "michelle.rivera@example.com",
    created_date: "25/05/2023",
    revenue: "$520.00",
    plan_status: "active",
    country: "United States",
  },
];
</script>

<template>
  <div class="table-container">
    <UTable
      :rows="rows"
      :columns="columns"
      :ui="{
        th: {
          base: 'bg-[#F4F7FE] first:rounded-tl-xl first:rounded-bl-xl last:rounded-tr-xl last:rounded-br-xl text-left',
          padding: 'py-3 px-5',
          font: 'font-semibold text-cv-primary',
        },
        td: {
          base: 'text-sm border-b-[1px] border-[#ECF1FD]',
          padding: 'py-3 px-0 pl-5',
          font: 'font-medium text-cv-primary/60',
        },
        divide: 'divide-y-0',
      }"
    >
      <template #empty-state>
        <div class="flex flex-col items-center justify-center py-6 gap-3">
          <span class="italic text-sm">No data found!</span>
        </div>
      </template>

      <template #name-data="{ row }">
        <div class="flex items-center gap-2.5">
          <!--  @TODO FIX AVATAR SIZE -->
          <UAvatar :src="row.image" alt="Avatar" size="base" />
          {{ row.name }}
        </div>
      </template>
      <template #plan_status-data="{ row }">
        <UBadge
          v-if="row.plan_status === 'active'"
          color="cyan"
          variant="ghost"
          size="sm"
          >{{ row.plan_status }}
        </UBadge>
        <UBadge
          v-if="row.plan_status === 'inactive'"
          color="gray"
          variant="ghost"
          size="sm"
          >{{ row.plan_status }}
        </UBadge>
      </template>

      <template #action-data="{}">
        <div class="flex items-center gap-1.5">
          <UButton size="2xl" class="h-auto">
            <Icon icon="system-uicons:create" class="text-cv-primary/60" />
          </UButton>
          <UButton size="2xl" class="h-auto">
            <Icon icon="system-uicons:trash" class="text-cv-primary/60" />
          </UButton>
        </div>
      </template>
    </UTable>
  </div>
</template>

<style lang="scss" scoped>
.table-container {
  @apply rounded-xl p-[25px];
  box-shadow: 0px 6px 48px 0px rgba(220, 226, 239, 0.5);
}
</style>
