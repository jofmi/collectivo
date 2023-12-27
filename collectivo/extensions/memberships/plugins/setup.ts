export default defineNuxtPlugin(() => {
  const menu = useCollectivoMenus();
  const forms = useCollectivoForms();
  const user = useCollectivoUser();

  const publicItems: CollectivoMenuItem[] = [
    {
      label: "Register",
      icon: "i-system-uicons-document-stack",
      to: "/forms/membership",
      order: 200,
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

  // Membership application form
  const is_legal = [
    {
      key: "directus_users.memberships_person_type",
      value: "legal",
    },
  ];

  const is_natural = [
    {
      key: "directus_users.memberships_person_type",
      value: "natural",
    },
  ];

  const is_sepa = [
    {
      key: "directus_users.memberships_payment_type",
      value: "sepa",
    },
  ];

  const membershipForm: CollectivoFormPage = {
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
      "directus_users.memberships_person_type": {
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
      "directus_users.email": {
        label: "Email",
        type: "email",
        default: "test@example.com",
        required: true,
        icon: "i-mi-mail",
      },
      "directus_users.password": {
        label: "Password",
        type: "password",
        required: true,
        icon: "i-mi-lock",
      },
      section_organisation: {
        type: "section",
        content: "Organization",
        conditions: is_legal,
      },
      "directus_users.memberships_organization_name": {
        label: "Organization name",
        type: "text",
        required: true,
        conditions: is_legal,
      },
      "directus_users.memberships_organization_type": {
        label: "Organization type",
        type: "text",
        required: true,
        conditions: is_legal,
      },
      "directus_users.memberships_organization_id": {
        label: "Organization ID",
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
      "directus_users.first_name": {
        type: "text",
        required: true,
        label: "First name",
      },
      "directus_users.last_name": {
        type: "text",
        required: true,
        label: "Last name",
      },
      "directus_users.memberships_gender": {
        type: "select-radio",
        label: "Gender",
        required: true,
        default: "diverse",
        choices: [
          {
            value: "diverse",
            label: "Divers",
          },
          {
            value: "female",
            label: "Female",
          },
          {
            value: "male",
            label: "Male",
          },
        ],
      },
      "directus_users.memberships_phone": {
        type: "text",
        label: "Phone",
        icon: "i-mi-call",
      },
      "directus_users.memberships_birthdate": {
        label: "Birthdate",
        type: "date",
        default: "2000-01-01",
        required: true,
        conditions: is_natural,
      },
      "directus_users.memberships_occupation": {
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
      "directus_users.memberships_street": {
        label: "Street",
        type: "text",
        required: true,
      },
      "directus_users.memberships_streetnumber": {
        label: "Number",
        type: "text",
        width: "xs",
        required: true,
      },
      "directus_users.memberships_stair": {
        label: "Stair",
        type: "text",
        width: "xs",
      },
      "directus_users.memberships_door": {
        label: "Door",
        type: "text",
        width: "xs",
      },
      "directus_users.memberships_postcode": {
        label: "Postcode",
        type: "text",
        width: "xs",
        required: true,
      },
      "directus_users.memberships_city": {
        label: "City",
        type: "text",
        required: true,
      },
      "directus_users.memberships_country": {
        label: "Country",
        type: "text",
        required: true,
      },
      section_membership: {
        type: "section",
        content: "Type of membership",
      },
      "memberships.memberships_type": {
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
      "directus_users.payments_type": {
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
      "directus_users.payments_account_iban": {
        label: "Bank account IBAN",
        type: "text",
        conditions: is_sepa,
        required: true,
      },
      "directus_users.payments_account_owner": {
        label: "Bank account owner",
        type: "text",
        conditions: is_sepa,
        required: true,
      },
      // section_final: {
      //   type: "section",
      //   content: "Terms",
      // },
      // terms: {
      //   type: "toggle",
      //   description: "I agree to XY.",
      //   width: "full",
      //   default: true,
      //   required: true,
      // },
    },
  };

  forms.value["membership"] = membershipForm;
});
