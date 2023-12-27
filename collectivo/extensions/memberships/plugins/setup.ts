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

  const is_legal = [
    {
      key: "person_type",
      value: "legal",
    },
  ];

  const is_natural = [
    {
      key: "person_type",
      value: "natural",
    },
  ];

  const is_sepa = [
    {
      key: "payment_type",
      value: "sepa",
    },
  ];

  // Mockup form data to be replaced later
  const registration_form: CollectivoFormPage = {
    title: "Membership application",
    public: true,
    submitMode: "postNuxt",
    submitPath: "/api/memberships/register",
    successTitle: "Application submitted!",
    successText:
      "Your membership application has been received. Please check your emails.",
    fields: {
      section_person_type: {
        type: "section",
        content: "Type of person",
      },
      person_type: {
        type: "select-radio",
        default: "natural",
        required: true,
        choices: [
          {
            value: "natural",
            label: "Natural person",
          },
          {
            value: "legal",
            label: "Organisation",
          },
        ],
      },
      section_account: {
        type: "section",
        content: "Account details",
      },
      email: {
        label: "Email",
        type: "email",
        default: "test@example.com",
        required: true,
        icon: "i-mi-mail",
      },
      password: {
        label: "Password",
        type: "password",
        required: true,
        icon: "i-mi-lock",
      },
      section_organisation: {
        type: "section",
        content: "Organisation",
        conditions: is_legal,
      },
      organisation_name: {
        label: "Organisation name",
        type: "text",
        required: true,
        conditions: is_legal,
      },
      organisation_type: {
        label: "Organisation type",
        type: "text",
        required: true,
        conditions: is_legal,
      },
      organisation_id: {
        label: "Organisation ID",
        type: "text",
        required: true,
        conditions: is_legal,
      },
      section_personal_data: {
        type: "section",
        content: "Personal data",
        conditions: is_natural,
      },
      section_personal_data_legal: {
        type: "section",
        content: "Organisation - Contact person",
        conditions: is_legal,
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
      phone: {
        type: "text",
        label: "Phone",
        icon: "i-mi-call",
      },
      birth_date: {
        label: "Birthdate",
        type: "date",
        default: "2000-01-01",
        required: true,
        conditions: is_natural,
      },
      occupation: {
        label: "Occupation",
        type: "text",
        required: true,
        conditions: is_natural,
      },
      section_address: {
        type: "section",
        content: "Address",
        conditions: is_natural,
      },
      section_address_legal: {
        type: "section",
        content: "Organisation - Address",
        conditions: is_legal,
      },
      street: {
        label: "Street",
        type: "text",
        required: true,
      },
      number: {
        label: "Number",
        type: "text",
        width: "xs",
        required: true,
      },
      stair: {
        label: "Stair",
        type: "text",
        width: "xs",
      },
      door: {
        label: "Door",
        type: "text",
        width: "xs",
      },
      postal_code: {
        label: "Postal code",
        type: "text",
        width: "xs",
        required: true,
      },
      city: {
        label: "City",
        type: "text",
        required: true,
      },
      country: {
        label: "Country",
        type: "text",
        required: true,
      },
      section_membership: {
        type: "section",
        content: "Type of membership",
      },
      membership_type: {
        type: "select-radio",
        required: true,
        default: "active",
        choices: [
          {
            value: "active",
            label: "Active",
          },
          {
            value: "investing",
            label: "Investing",
          },
        ],
      },
      section_payment: {
        type: "section",
        content: "Payment details",
      },
      payment_type: {
        label: "Payment type",
        type: "select-radio",
        width: "full",
        default: "transfer",
        required: true,
        choices: [
          {
            value: "sepa",
            label: "SEPA",
          },
          {
            value: "transfer",
            label: "Direct transfer",
          },
        ],
      },
      bank_account_iban: {
        label: "Bank account IBAN",
        type: "text",
        conditions: is_sepa,
        required: true,
      },
      bank_account_owner: {
        label: "Bank account owner",
        type: "text",
        conditions: is_sepa,
        required: true,
      },
      section_final: {
        type: "section",
        content: "Terms",
      },
      terms: {
        type: "toggle",
        description: "I agree to the terms and conditions",
        width: "full",
        default: true,
        required: true,
      },
    },
  };

  forms.value["memberships_register"] = registration_form;
});
