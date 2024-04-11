export default defineNuxtPlugin(() => {
  const menu = useCollectivoMenus();
  const user = useCollectivoUser();
  const runtimeConfig = useRuntimeConfig();

  const items: CollectivoMenuItem[] = [
    {
      label: "Home",
      icon: "i-heroicons-home",
      to: "/",
      order: 0,
    },
    {
      label: "Profil",
      icon: "i-heroicons-user-circle",
      to: "/profile/",
      order: 1,
    },
    {
      label: "Studio",
      icon: "i-heroicons-chart-bar-square",
      to: runtimeConfig.public.directusUrl,
      external: true,
      // hideOnMobile: true,
      order: 99,
      filter: async (_item) => {
        await user.value.load();
        return user.value.data?.role?.app_access ?? false;
      },
    },
  ];

  const profilePublicItems: CollectivoMenuItem[] = [
    {
      label: "Login",
      icon: "i-heroicons-arrow-right-on-rectangle-solid",
      click: user.value.login,
      order: 100,
      filter: (_item) => {
        return true;
      },
    },
  ];

  const profileItems: CollectivoMenuItem[] = [
    {
      label: "Profile",
      icon: "i-heroicons-user-circle",
      to: "/profile/",
      order: 1,
    },
    {
      label: "Logout",
      icon: "i-heroicons-arrow-left-on-rectangle-solid",
      click: () => {
        user.value.logout();
      },
      order: 1000,
    },
  ];

  menu.value.main.push(...items);

  menu.value.profile.push(...profileItems);
  menu.value.profile_public.push(...profilePublicItems);

  const profileInputs: CollectivoFormField[] = [
    {
      type: "section",
      order: 100,
      title: "User account",
    },
    {
      label: "First name",
      key: "first_name",
      type: "text",
      order: 101,
      disabled: true,
    },
    {
      label: "Last name",
      key: "last_name",
      type: "text",
      order: 102,
      disabled: true,
    },
    {
      label: "Email",
      key: "email",
      type: "text",
      order: 103,
      disabled: true,
    },
  ];

  user.value.fields = Object.assign(profileInputs, user.value.fields);
});
