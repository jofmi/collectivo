export default defineNuxtPlugin({
  name: "memberships-setup",
  async setup() {
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
      another: {
        label: "Another profile field",
        type: "text",
        order: 4,
        disabled: true,
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
        key: "directus_users.payments_type",
        value: "sepa",
      },
    ];

    const membershipForm: CollectivoFormPage = {
      title: "Membership application form",
      public: true,
      status: "published",
      submitMode: "postNuxt",
      submitPath: "/api/memberships/register",
      successTitle: "Application submitted!",
      successText: "t:memberships_form_success_text",
      fields: {
        section_welcome: {
          type: "section",
          order: 10,
          title: "Welcome!",
          description: "t:memberships_form_intro",
        },
        section_person_type: {
          type: "section",
          order: 100,
          title: "Type of person",
        },
        "directus_users.memberships_person_type": {
          type: "select-radio",
          label: "t:memberships_form_ptype",
          default: "natural",
          order: 110,
          required: true,
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
        section_account: {
          type: "section",
          order: 200,
          title: "User account",
        },
        "directus_users.email": {
          label: "Email",
          type: "email",
          order: 210,
          required: true,
          icon: "i-mi-mail",
        },
        "directus_users.password": {
          label: "Password",
          type: "password",
          order: 220,
          required: true,
          icon: "i-mi-lock",
        },
        section_organization: {
          type: "section",
          title: "Organization",
          order: 300,
          conditions: is_legal,
        },
        "directus_users.memberships_organization_name": {
          label: "Organization name",
          type: "text",
          order: 310,
          required: true,
          conditions: is_legal,
        },
        "directus_users.memberships_organization_type": {
          label: "Organization type",
          type: "text",
          order: 320,
          required: true,
          conditions: is_legal,
        },
        "directus_users.memberships_organization_id": {
          label: "Organization ID",
          type: "text",
          order: 330,
          required: true,
          conditions: is_legal,
        },
        section_personal_data: {
          type: "section",
          order: 400,
          title: "Personal data",
          conditions: is_natural,
        },
        section_personal_data_legal: {
          type: "section",
          order: 401,
          title: "Organization Contact person",
          conditions: is_legal,
        },
        "directus_users.first_name": {
          type: "text",
          order: 410,
          required: true,
          label: "First name",
        },
        "directus_users.last_name": {
          type: "text",
          order: 420,
          required: true,
          label: "Last name",
        },
        "directus_users.memberships_gender": {
          type: "select",
          order: 430,
          label: "Gender",
          required: true,
          default: "diverse",
          choices: [
            {
              value: "diverse",
              label: "Diverse",
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
          order: 440,
          label: "Phone",
          icon: "i-mi-call",
        },
        "directus_users.memberships_birthday": {
          label: "Birthday",
          type: "date",
          order: 450,
          default: "2000-01-01",
          required: true,
          conditions: is_natural,
        },
        "directus_users.memberships_occupation": {
          label: "Occupation",
          type: "text",
          order: 460,
          required: true,
          conditions: is_natural,
          icon: "i-system-uicons-briefcase",
        },
        section_address: {
          type: "section",
          order: 500,
          title: "Address",
          conditions: is_natural,
        },
        section_address_legal: {
          type: "section",
          order: 501,
          title: "Organization Address",
          conditions: is_legal,
        },
        "directus_users.memberships_street": {
          label: "Street",
          type: "text",
          order: 510,
          required: true,
        },
        "directus_users.memberships_streetnumber": {
          label: "Number",
          type: "text",
          order: 511,
          width: "xs",
          required: true,
        },
        "directus_users.memberships_stair": {
          label: "Stair",
          type: "text",
          order: 512,
          width: "xs",
        },
        "directus_users.memberships_door": {
          label: "Door",
          type: "text",
          order: 513,
          width: "xs",
        },
        "directus_users.memberships_postcode": {
          label: "Postcode",
          type: "text",
          order: 514,
          width: "xs",
          required: true,
        },
        "directus_users.memberships_city": {
          label: "City",
          type: "text",
          order: 515,
          required: true,
        },
        "directus_users.memberships_country": {
          label: "Country",
          type: "text",
          order: 516,
          required: true,
        },
        section_membership: {
          type: "section",
          order: 600,
          title: "Type of membership",
        },
        "memberships.memberships_type": {
          type: "select-radio",
          label: "t:memberships_form_mtype",
          required: true,
          width: "full",
          order: 610,
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
      },
    };

    forms.value["membership"] = membershipForm;

    console.log("memberships form loaded");
  },
});
