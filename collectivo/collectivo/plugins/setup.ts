import CustomVue from "~/components/collectivo/forms/Custom.vue";

export default defineNuxtPlugin(() => {
  const menu = useCollectivoMenus();
  const forms = useCollectivoForms();
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
    title: "Test Form Title",
    submitMode: "postNuxt",
    submitPath: "/api/memberships/register",
    fields: {
      section: {
        type: "section",
        content: "This is a section",
      },
      description: {
        type: "description",
        content: "This is a description",
      },
      text: {
        type: "text",
        required: true,
        label: "Text",
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
      date: {
        type: "date",
        label: "Date",
      },
      show_conditional: {
        type: "toggle",
        label: "Show conditional",
      },
      number: {
        type: "number",
        label: "Number",
        validators: [
          {
            type: "min",
            value: 5,
          },
          {
            type: "max",
            value: 10,
          },
        ],
      },
      select: {
        type: "select-radio",
        label: "Select",
        choices: [
          {
            label: "1",
            value: "1",
          },
          {
            label: "2",
            value: "2",
          },
          {
            label: "3",
            value: "3",
          },
        ],
      },
      multiselect: {
        type: "multiselect-checkbox",
        label: "Multiselect",
        choices: [
          {
            label: "1",
            value: "1",
          },
          {
            label: "2",
            value: "2",
          },
          {
            label: "3",
            value: "3",
          },
        ],
      },
      clear: {
        type: "clear",
      },
      conditional_text: {
        type: "text",
        label: "Conditional Text",
        required: true,
        conditions: [
          {
            key: "show_conditional",
            value: true,
          },
        ],
        validators: [
          {
            type: "min",
            value: 5,
          },
          {
            type: "max",
            value: 10,
          },
        ],
      },
      custom: {
        type: "custom",
        component: CustomVue,
      },
    },
  };

  forms.value["test_form"] = test_form;
});
