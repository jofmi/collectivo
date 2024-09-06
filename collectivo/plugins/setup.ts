export default defineNuxtPlugin(() => {
  const menu = useCollectivoMenus();
  const user = useCollectivoUser().value;
  const runtimeConfig = useRuntimeConfig();

  const items: CollectivoMenuItem[] = [
    {
      label: "Home",
      icon: "i-heroicons-home",
      to: "/",
      order: 0,
    },
    {
      label: "Studio",
      icon: "i-heroicons-chart-bar-square",
      to: runtimeConfig.public.directusUrl,
      external: true,
      order: 99,
      filter: async () => {
        return user.user?.role?.app_access ?? false;
      },
    },
  ];

  const profilePublicItems: CollectivoMenuItem[] = [
    {
      label: "Login",
      icon: "i-heroicons-arrow-right-on-rectangle-solid",
      click: user.login,
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
      click: user.logout,
      order: 1000,
    },
  ];

  menu.value.main.push(...items);
  menu.value.profile.push(...profileItems);
  menu.value.profile_public.push(...profilePublicItems);

  const is_legal_profile = [
    {
      key: "memberships_person_type",
      value: "legal",
    },
  ];

  const is_natural_profile = [
    {
      key: "memberships_person_type",
      value: "natural",
    },
  ];

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
    },
    {
      label: "Password",
      key: "password",
      type: "password",
      order: 104,
    },
    {
      type: "section",
      order: 700,
      title: "Payment details",
    },
    {
      type: "select",
      key: "memberships_person_type",
      label: "Type of person",
      default: "natural",
      order: 420,
      disabled: true,
      choices: [
        {
          value: "natural",
          label: "an individual",
        },
        {
          value: "legal",
          label: "an organization",
        },
      ],
    },
    {
      type: "select",
      order: 430,
      key: "memberships_gender",
      label: "Gender",
      required: true,
      choices: [
        {
          value: "female",
          label: "Female",
        },
        {
          value: "male",
          label: "Male",
        },
        {
          value: "diverse",
          label: "Diverse",
        },
      ],
    },
    {
      type: "text",
      key: "memberships_phone",
      order: 440,
      label: "Phone",
      icon: "i-mi-call",
    },
    {
      label: "Occupation",
      key: "memberships_occupation",
      type: "text",
      order: 450,
      required: true,
      conditions: is_natural_profile,
      icon: "i-heroicons-briefcase",
    },
    {
      label: "Birthday",
      key: "memberships_birthday",
      type: "date",
      order: 460,
      width: "lg",
      required: true,
      conditions: is_natural_profile,
    },
    {
      type: "section",
      order: 500,
      title: "Address",
      conditions: is_natural_profile,
    },
    {
      type: "section",
      order: 501,
      title: "Organization address",
      conditions: is_legal_profile,
    },
    {
      label: "Street",
      key: "memberships_street",
      type: "text",
      order: 510,
      required: true,
    },
    {
      label: "Number",
      type: "text",
      key: "memberships_streetnumber",
      order: 511,
      width: "sm",
      required: true,
    },
    {
      label: "Stair",
      key: "memberships_stair",
      type: "text",
      order: 512,
      width: "sm",
    },
    {
      label: "Door",
      key: "memberships_door",
      type: "text",
      order: 513,
      width: "sm",
    },
    {
      label: "Postcode",
      key: "memberships_postcode",
      type: "text",
      order: 514,
      width: "sm",
      required: true,
    },
    {
      label: "City",
      key: "memberships_city",
      type: "text",
      order: 515,
      required: true,
    },
    {
      label: "Country",
      key: "memberships_country",
      type: "text",
      order: 516,
      required: true,
    },
  ];

  user.fields.push(...profileInputs);
});
