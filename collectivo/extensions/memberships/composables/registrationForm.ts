const is_not_authenticated: CollectivoFormCondition[] = [
  {
    type: "notAuthenticated",
  },
];

export const useMembershipsRegistrationForm = () =>
  useState<CollectivoForm>("memberships_registration_form", () => ({
    title: "Membership application form",
    public: true,
    submitMode: "postNuxt",
    submitPath: "/api/memberships/register",
    successTitle: "Application submitted!",
    fields: [
      {
        type: "section",
        key: "section_welcome",
        order: 10,
        title: "Welcome!",
        description: "t:memberships_form_intro",
      },
      {
        type: "section",
        order: 200,
        title: "User account",
        conditions: is_not_authenticated,
      },
      {
        key: "directus_users__email",
        label: "Email",
        type: "email",
        order: 210,
        required: true,
        icon: "i-mi-mail",
        conditions: is_not_authenticated,
      },
      {
        label: "Password",
        key: "directus_users__password",
        type: "password",
        order: 220,
        required: true,
        icon: "i-mi-lock",
        conditions: is_not_authenticated,
      },
    ],
  }));
