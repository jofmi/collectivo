export default defineNuxtPlugin(() => {
  const menu = useCollectivoMenus();
  const user = useCollectivoUser();
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
      label: "Studio",
      icon: "i-system-uicons-cubes",
      to: runtimeConfig.public.directusUrl,
      external: true,
      hideOnMobile: true,
      order: 99,
      filter: (_item) => {
        return true;
      },
    },
  ];

  const publicItems: CollectivoMenuItem[] = [
    {
      label: "Login",
      icon: "i-system-uicons-enter",
      click: requireAuth,
      order: 100,
      filter: (_item) => {
        return true;
      },
    },
  ];

  menu.value.main.push(...items);
  menu.value.public.push(...publicItems);

  const profileInputs: CollectivoFormFields = {
    first_name: {
      label: "First name",
      type: "text",
      order: 1,
      disabled: true,
    },
    last_name: {
      label: "Last name",
      type: "text",
      order: 2,
      disabled: true,
    },
    email: {
      label: "Email",
      type: "text",
      order: 3,
      disabled: true,
    },
  };

  user.value.fields = Object.assign(profileInputs, user.value.fields);
});
