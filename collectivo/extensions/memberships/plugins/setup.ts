export default defineNuxtPlugin({
  name: "memberships-setup",
  async setup() {
    const menu = useCollectivoMenus();
    const user = useCollectivoUser();

    const publicItems: CollectivoMenuItem[] = [
      {
        label: "Register",
        icon: "i-heroicons-document-text",
        to: "/memberships/register",
        order: 200,
        filter: (_item) => {
          return true;
        },
      },
    ];

    const profileItems: CollectivoMenuItem[] = [
      {
        label: "Membership",
        to: "/memberships/membership",
        icon: "i-heroicons-identification",
        order: 20,
      },
    ];

    menu.value.main_public.push(...publicItems);
    menu.value.profile.push(...profileItems);

    const is_legal = [
      {
        key: "memberships_person_type",
        value: "legal",
      },
    ];

    const is_natural = [
      {
        key: "memberships_person_type",
        value: "natural",
      },
    ];

    const profileInputs: CollectivoFormField[] = [
      {
        type: "section",
        order: 400,
        title: "Personal data",
        conditions: is_natural,
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
          {
            value: "inter",
            label: "Inter",
          },
          {
            value: "open",
            label: "Offen",
          },
          {
            value: "no-answer",
            label: "No answer",
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
        conditions: is_natural,
        icon: "i-heroicons-briefcase",
      },
      {
        label: "Birthday",
        key: "memberships_birthday",
        type: "date",
        order: 460,
        width: "lg",
        required: true,
        conditions: is_natural,
      },
      {
        type: "section",
        order: 500,
        title: "Address",
        conditions: is_natural,
      },
      {
        type: "section",
        order: 501,
        title: "Organization address",
        conditions: is_legal,
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

    user.value.fields.push(...profileInputs);
  },
});
