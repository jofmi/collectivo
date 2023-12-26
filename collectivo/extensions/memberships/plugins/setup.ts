export default defineNuxtPlugin(() => {
  const menu = useCollectivoMenus();
  const forms = useCollectivoForms();
  const user = useCollectivoUser();

  const publicItems: CollectivoMenuItem[] = [
    {
      label: "Register",
      icon: "i-system-uicons-document-stack",
      to: "/forms/registration",
      order: 1,
      filter: (_item) => {
        return true;
      },
    },
  ];

  menu.value.public.push(...publicItems);

  const profileInputs: CollectivoFormFields = {
    first_name: {
      label: "First Name",
      type: "text",
      disabled: true,
    },
    last_name: {
      label: "Last Name",
      type: "text",
      disabled: true,
    },
    email: {
      label: "Email",
      type: "text",
    },
  };

  user.value.fields = Object.assign(profileInputs, user.value.fields);

  // Mockup form data to be replaced later
  const test_form: CollectivoFormPage = {
    title: "Membership registration",
    submitMode: "postNuxt",
    submitPath: "/api/memberships/register",
    fields: {
      person_type_section: {
        type: "section",
        content: "Type of person",
      },
      person_type: {
        type: "select-radio",
        label: "Type of person",
        choices: [
          {
            key: "natural",
            value: "Natural person",
          },
          {
            key: "legal",
            value: "Legal person",
          },
        ],
      },
      personal_section: {
        type: "section",
        content: "Personal data",
      },
      first_name: {
        type: "text",
        required: true,
        label: "First name",
      },
      last_name: {
        type: "text",
        required: true,
        label: "Last name",
      },
      email: {
        type: "email",
        required: true,
        label: "Email",
        icon: "i-system-uicons-mail",
      },
      password: {
        type: "password",
        required: true,
        label: "Password",
      },
      birth_date: {
        type: "date",
        label: "Birthdate",
        conditions: [
          {
            key: "person_type",
            value: "natural",
          },
        ],
      },
      clear: {
        type: "clear",
      },
    },
  };

  forms.value["memberships_register"] = test_form;
});
