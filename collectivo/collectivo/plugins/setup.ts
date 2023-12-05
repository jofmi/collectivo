export default defineNuxtPlugin(() => {
  const menu = useSidebarMenu();
  const profile = useProfile();
  const runtimeConfig = useRuntimeConfig();

  const items: CollectivoMenuItem[] = [
    {
      label: "Home",
      icon: "i-system-uicons-grid",
      to: "/",
      order: 0,
    },
    {
      label: "Profile",
      icon: "i-system-uicons-user-male-circle",
      to: "/profile",
      order: 0,
    },
    {
      label: "Database",
      icon: "i-system-uicons-cube",
      to: runtimeConfig.public.directusUrl,
      external: true,
      mobile: false,
      order: 99,
      filter: (_item) => {
        return true;
      },
    },
  ];

  menu.value = { ...items };

  const profileInputs: CollectivoProfileInput[] = [
    {
      label: "First Name",
      key: "first_name",
      disabled: true,
      order: 1,
    },
    {
      label: "Last Name",
      key: "last_name",
      disabled: true,
      order: 2,
    },
    {
      label: "Email",
      key: "email",
      order: 3,
    },
  ];

  profile.value.inputs.push(...profileInputs);
});
