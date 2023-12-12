import { Vueform } from "@vueform/vueform";

export const useForms = () =>
  useState<{ [key: string]: any }>("collectivo_forms", () => ({}));

const forms = useForms();

forms.value.test_form = {
  size: "md",
  displayErrors: false,
  steps: {
    page0: {
      label: "Step 1",
      elements: [
        "page_title",
        "divider",
        "container",
        "birthday",
        "country",
        "state",
        "phone",
        "email",
        "email_copy",
        "password",
        "password_confirmation",
        "divider_1",
      ],
    },
    page1: {
      label: "Step 2",
      elements: ["terms", "marketing_emails"],
    },
  },
  addClass: "vf-create-account",
  schema: {
    page_title: {
      type: "static",
      content: "Create account",
      tag: "h1",
    },
    divider: {
      type: "static",
      tag: "hr",
    },
    container: {
      type: "group",
      schema: {
        first_name: {
          type: "text",
          placeholder: "First name",
          columns: {
            container: 6,
            label: 12,
            wrapper: 12,
          },
          fieldName: "First name",
          rules: ["required", "max:255"],
        },
        last_name: {
          type: "text",
          placeholder: "Last name",
          columns: {
            container: 6,
            label: 12,
            wrapper: 12,
          },
          fieldName: "Last name",
          rules: ["required", "max:255"],
        },
      },
      description: "Make sure it matches your legal name",
    },
    birthday: {
      type: "date",
      placeholder: "Birthday",
      fieldName: "Birthday",
      rules: ["required"],
      description: "Your birthday is not visible others.",
      displayFormat: "MMMM Do, YYYY",
    },
    // country: {
    //   type: "select",
    //   search: true,
    //   native: false,
    //   inputType: "search",
    //   autocomplete: "disabled",
    //   placeholder: "Country",
    //   items: "/json/countries.json",
    // },
    // state: {
    //   type: "select",
    //   search: true,
    //   native: false,
    //   inputType: "search",
    //   autocomplete: "disabled",
    //   placeholder: "State",
    //   items: "/json/states.json",
    //   conditions: [["country", "in", ["US"]]],
    // },
    phone: {
      type: "text",
      inputType: "tel",
      placeholder: "Phone",
      rules: ["required"],
      fieldName: "Phone",
    },
    email: {
      type: "text",
      inputType: "email",
      rules: ["required", "max:255", "email"],
      placeholder: "Email",
      fieldName: "Email",
      description: "You will receive a confirmation letter to this email.",
    },
    email_copy: {
      type: "text",
      inputType: "email",
      rules: ["required", "max:255", "email", "same:email"],
      placeholder: "Email",
      fieldName: "Email",
      description: "You will receive a confirmation letter to this email.",
    },
    password: {
      type: "text",
      inputType: "password",
      rules: ["required", "min:8", "same:password_confirmation"],
      fieldName: "Password",
      placeholder: "Password",
    },
    password_confirmation: {
      type: "text",
      inputType: "password",
      rules: ["required"],
      fieldName: "Password confirmation",
      placeholder: "Password again",
    },
    divider_1: {
      type: "static",
      tag: "hr",
    },
    terms: {
      type: "checkbox",
      text: "I accept the Terms & Conditions & Privacy Policy",
    },
    marketing_emails: {
      type: "checkbox",
      text: "I want to recieve marketing emails",
    },
  },
};
