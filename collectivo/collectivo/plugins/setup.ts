export default defineNuxtPlugin(() => {
  const menu = useSidebarMenu();
  const runtimeConfig = useRuntimeConfig();

  const items = <CollectivoMenuItem[]>[
    {
      label: "Home",
      icon: "i-system-uicons-grid",
      path: "/",
      order: 0,
    },
    {
      label: "Profile",
      icon: "i-system-uicons-user-male-circle",
      path: "/profile",
      order: 0,
    },
    {
      label: "Database",
      icon: "i-system-uicons-cube",
      path: runtimeConfig.public.directusUrl,
      external: true,
      mobile: false,
      order: 99,
      filter: (_item) => {
        return true;
      },
    },
  ];

  menu.value = { ...items };
});
